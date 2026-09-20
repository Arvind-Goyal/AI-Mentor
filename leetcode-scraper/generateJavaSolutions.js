import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_MODEL = process.env.OLLAMA_MODEL || "qwen3:8b";
const DEFAULT_ENDPOINT = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseOptions(args) {
  const options = {
    input: "leetcode-problems.json",
    output: "leetcode-java-solutions.json",
    model: DEFAULT_MODEL,
    endpoint: DEFAULT_ENDPOINT,
    delay: 1_000,
    limit: Infinity,
    resume: true,
    maxInputChars: 8_000,
  };
  for (let index = 0; index < args.length; index += 1) {
    const [flag, inlineValue] = args[index].split(/=(.*)/s);
    const value = inlineValue ?? args[index + 1];
    if (flag === "--input" && value) options.input = value;
    else if (flag === "--output" && value) options.output = value;
    else if (flag === "--model" && value) options.model = value;
    else if (flag === "--endpoint" && value) options.endpoint = value.replace(/\/$/, "");
    else if (flag === "--delay" && value) options.delay = Number(value);
    else if (flag === "--limit" && value) options.limit = Number(value);
    else if (flag === "--max-input-chars" && value) options.maxInputChars = Number(value);
    else if (flag === "--no-resume") options.resume = false;
  }
  if (!Number.isFinite(options.delay) || options.delay < 0) throw new Error("--delay must be zero or greater");
  if (!(Number.isFinite(options.limit) || options.limit === Infinity) || options.limit < 1) throw new Error("--limit must be positive");
  if (!Number.isInteger(options.maxInputChars) || options.maxInputChars < 2_000) throw new Error("--max-input-chars must be at least 2000");
  return options;
}

async function readJsonArray(file) {
  try {
    const data = JSON.parse(await fs.readFile(file, "utf8"));
    if (!Array.isArray(data)) throw new Error("file must contain a JSON array");
    return data;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function saveJsonArray(file, data) {
  const temporary = `${file}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(data, null, 2), "utf8");
  try {
    await fs.rename(temporary, file);
  } catch (error) {
    // OneDrive can briefly lock the destination during sync. Keep the completed
    // temporary save rather than discarding it, so no generated work is lost.
    if (error.code === "EPERM") {
      await fs.copyFile(temporary, file);
      await fs.unlink(temporary);
    } else {
      throw error;
    }
  }
}

function javaTemplate(problem) {
  const snippets = problem.codeSnippets ?? [];
  return snippets.find((snippet) => /^(java|java 17|java 21)$/i.test(snippet.language ?? ""))?.code ?? "";
}

function compactProblem(problem, maxChars) {
  const source = {
    frontendId: problem.frontendId,
    title: problem.title,
    slug: problem.slug,
    difficulty: problem.difficulty,
    statement: problem.statementText,
    constraints: problem.constraints,
    examples: problem.examples,
    hints: problem.hints,
    javaStarterTemplate: javaTemplate(problem),
  };
  const serialized = JSON.stringify(source, null, 2);
  return serialized.length <= maxChars ? serialized : `${serialized.slice(0, maxChars)}\n[Statement truncated]`;
}

const solutionSchema = {
  type: "object",
  additionalProperties: false,
  required: ["approachName", "summary", "algorithm", "correctnessProof", "timeComplexity", "spaceComplexity", "javaCode"],
  properties: {
    approachName: { type: "string" },
    summary: { type: "string" },
    algorithm: { type: "array", items: { type: "string" } },
    correctnessProof: { type: "string" },
    timeComplexity: { type: "string" },
    spaceComplexity: { type: "string" },
    javaCode: { type: "string" },
  },
};

function buildPrompt(problemText) {
  return `Create one original, correct solution for this LeetCode problem in Java. Do not reproduce an editorial or cite external sources. Return only the requested JSON schema.

Requirements:
- Use the provided Java starter signature when supplied. Otherwise use LeetCode's conventional class Solution.
- The code must be Java 17-compatible and contain no Markdown fences, main method, input parsing, or package declaration.
- Respect every constraint and cover edge cases.
- Give a concise, standalone summary; an ordered algorithm; a short correctness proof; and tight Big-O bounds.
- Do not claim the solution was executed or tested.

Problem data:
${problemText}`;
}

async function generateSolution(endpoint, model, problemText) {
  const response = await fetch(`${endpoint}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      stream: false,
      think: false,
      format: solutionSchema,
      options: { temperature: 0.1 },
      messages: [
        { role: "system", content: "You are a meticulous competitive-programming engineer. Produce only valid structured output." },
        { role: "user", content: buildPrompt(problemText) },
      ],
    }),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(`Ollama ${response.status}: ${body.error ?? JSON.stringify(body)}`);
  if (!body.message?.content) throw new Error("Ollama response had no generated message content");
  return { solution: JSON.parse(body.message.content), model: body.model };
}

function embeddingText(problem, solution) {
  return [
    `LeetCode ${problem.frontendId}: ${problem.title}`,
    `Difficulty: ${problem.difficulty}`,
    `Problem: ${problem.statementText}`,
    `Constraints: ${(problem.constraints ?? []).join(" | ")}`,
    `Approach: ${solution.approachName}. ${solution.summary}`,
    `Algorithm: ${solution.algorithm.join(" ")}`,
    `Correctness: ${solution.correctnessProof}`,
    `Time: ${solution.timeComplexity}. Space: ${solution.spaceComplexity}.`,
    `Java solution:\n${solution.javaCode}`,
  ].filter(Boolean).join("\n\n");
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const inputFile = path.resolve(options.input);
  const outputFile = path.resolve(options.output);
  const problems = await readJsonArray(inputFile);
  if (!problems.length) throw new Error(`No problem records found in ${inputFile}`);
  const existing = options.resume ? await readJsonArray(outputFile) : [];
  const bySlug = new Map(existing.map((record) => [record.slug, record]));
  const targets = problems.slice(0, options.limit);

  console.log(`Generating Java solutions for ${targets.length} problems (${bySlug.size} already saved)...`);
  for (let index = 0; index < targets.length; index += 1) {
    const problem = targets[index];
    if (bySlug.has(problem.slug)) continue;
    console.log(`[${index + 1}/${targets.length}] ${problem.frontendId}. ${problem.title}`);
    try {
      const generated = await generateSolution(options.endpoint, options.model, compactProblem(problem, options.maxInputChars));
      const record = {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        source: { id: problem.id, frontendId: problem.frontendId, title: problem.title, slug: problem.slug, url: problem.url, difficulty: problem.difficulty },
        slug: problem.slug,
        model: generated.model,
        verificationStatus: "unverified_generated",
        solution: generated.solution,
        embeddingText: embeddingText(problem, generated.solution),
      };
      bySlug.set(problem.slug, record);
      await saveJsonArray(outputFile, [...bySlug.values()]);
    } catch (error) {
      console.error(`  Failed: ${error.message}`);
    }
    await sleep(options.delay);
  }
  await saveJsonArray(outputFile, [...bySlug.values()]);
  console.log(`Done. Saved ${bySlug.size} Java solution records to ${outputFile}`);
}

main().catch((error) => { console.error("Fatal error:", error.message); process.exitCode = 1; });
