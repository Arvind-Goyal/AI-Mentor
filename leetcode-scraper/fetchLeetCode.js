import axios from "axios";
import * as cheerio from "cheerio";
import fs from "node:fs/promises";
import path from "node:path";

const URL = "https://leetcode.com/graphql";
const HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "leetcode-dataset-builder/1.0 (educational dataset export)",
  Referer: "https://leetcode.com/problemset/all/",
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseArguments(args) {
  const options = { output: "leetcode-problems.json", delay: 700, pageSize: 100, limit: Infinity, resume: true, includePremium: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    const value = args[index + 1];
    const [flag, inlineValue] = argument.split(/=(.*)/s);
    const suppliedValue = inlineValue ?? value;
    if (flag === "--output" && suppliedValue) options.output = suppliedValue;
    else if (flag === "--delay" && suppliedValue) options.delay = Number(suppliedValue);
    else if (flag === "--page-size" && suppliedValue) options.pageSize = Number(suppliedValue);
    else if (flag === "--limit" && suppliedValue) options.limit = Number(suppliedValue);
    else if (flag === "--no-resume") options.resume = false;
    else if (flag === "--include-premium") options.includePremium = true;
  }
  if (!Number.isFinite(options.delay) || options.delay < 0) throw new Error("--delay must be zero or greater");
  if (!Number.isInteger(options.pageSize) || options.pageSize < 1 || options.pageSize > 1000) throw new Error("--page-size must be an integer from 1 to 1000");
  if (!(Number.isFinite(options.limit) || options.limit === Infinity) || options.limit < 1) throw new Error("--limit must be a positive number");
  return options;
}

async function graphql(query, variables = {}) {
  const response = await axios.post(URL, { query, variables }, { headers: HEADERS, timeout: 30_000, validateStatus: () => true });
  if (response.data.errors?.length) throw new Error(response.data.errors.map((error) => error.message).join("; "));
  if (response.status >= 400) throw new Error(`HTTP ${response.status}: ${JSON.stringify(response.data)}`);
  return response.data.data;
}

async function getProblemPage(limit, skip) {
  const query = `query problemsetQuestionListV2($categorySlug: String, $limit: Int, $skip: Int) {
    problemsetQuestionListV2(categorySlug: $categorySlug, limit: $limit, skip: $skip) {
      questions { questionFrontendId title titleSlug difficulty paidOnly topicTags { name slug } }
    }
  }`;
  const data = await graphql(query, { categorySlug: "", limit, skip });
  return data.problemsetQuestionListV2;
}

async function getProblemDetails(titleSlug) {
  const query = `query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId questionFrontendId boundTopicId title titleSlug content difficulty likes dislikes categoryTitle isPaidOnly acRate
      exampleTestcases sampleTestCase metaData hints stats similarQuestions topicTags { name slug }
      codeSnippets { lang langSlug code } enableRunCode envInfo
    }
  }`;
  const data = await graphql(query, { titleSlug });
  return data.question;
}

function normalizeText(text = "") {
  return text.replace(/\u00a0/g, " ").replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n\n").trim();
}

function sectionItems($, heading) {
  const items = [];
  for (let next = heading.next(); next.length; next = next.next()) {
    if (/^h[1-6]$/i.test(next[0].tagName)) break;
    if (next.is("ul, ol")) next.children("li").each((_, item) => items.push(normalizeText($(item).text())));
    else if (next.is("p, div, pre")) {
      const text = normalizeText(next.text());
      if (text) items.push(text);
    }
  }
  return [...new Set(items)];
}

function extractContent(html) {
  if (!html) return { statementText: "", constraints: [], examples: [], sections: {} };
  const $ = cheerio.load(html);
  $("script, style").remove();
  const sections = {};
  const constraints = [];
  $("h1, h2, h3, h4, strong").each((_, element) => {
    const heading = $(element);
    const sectionStart = heading.is("strong") ? heading.parent() : heading;
    const name = normalizeText(heading.text()).replace(/:$/, "");
    if (!name) return;
    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    const items = sectionItems($, sectionStart);
    if (items.length && !sections[key]) sections[key] = items;
    if (/constraints?/i.test(name)) constraints.push(...items);
  });
  const examples = [];
  $("pre").each((_, pre) => {
    const raw = normalizeText($(pre).text());
    if (/\bInput\s*:/i.test(raw) || /\bOutput\s*:/i.test(raw)) {
      examples.push({
        raw,
        input: raw.match(/Input\s*:\s*([\s\S]*?)(?=\s*Output\s*:|$)/i)?.[1]?.trim() ?? null,
        output: raw.match(/Output\s*:\s*([\s\S]*?)(?=\s*Explanation\s*:|$)/i)?.[1]?.trim() ?? null,
        explanation: raw.match(/Explanation\s*:\s*([\s\S]*)$/i)?.[1]?.trim() ?? null,
      });
    }
  });
  return { statementText: normalizeText($.root().text()), constraints: [...new Set(constraints)], examples, sections };
}

function parseEmbeddedJson(value, fallback) {
  if (!value) return fallback;
  try { return JSON.parse(value); } catch { return value; }
}

function makeProblemRecord(details) {
  const parsed = extractContent(details.content);
  return {
    schemaVersion: 1, fetchedAt: new Date().toISOString(), id: details.questionId, frontendId: details.questionFrontendId,
    boundTopicId: details.boundTopicId, title: details.title, slug: details.titleSlug, url: `https://leetcode.com/problems/${details.titleSlug}/`,
    difficulty: details.difficulty, paidOnly: details.isPaidOnly, category: details.categoryTitle, acceptanceRate: details.acRate,
    likes: details.likes, dislikes: details.dislikes, statementHtml: details.content ?? "", statementText: parsed.statementText,
    sections: parsed.sections, constraints: parsed.constraints, examples: parsed.examples, exampleTestcases: details.exampleTestcases ?? "",
    sampleTestCase: details.sampleTestCase ?? "", hints: details.hints ?? [], topics: details.topicTags ?? [],
    similarQuestions: parseEmbeddedJson(details.similarQuestions, []), metadata: parseEmbeddedJson(details.metaData, null), stats: parseEmbeddedJson(details.stats, null),
    codeSnippets: (details.codeSnippets ?? []).map(({ lang, langSlug, code }) => ({ language: lang, languageSlug: langSlug, code })),
    runnable: details.enableRunCode, environment: details.envInfo,
  };
}

async function readExisting(output) {
  try {
    const data = JSON.parse(await fs.readFile(output, "utf8"));
    if (!Array.isArray(data)) throw new Error("dataset must be a JSON array");
    return data;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function saveDataset(output, problems) {
  const temporary = `${output}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(problems, null, 2), "utf8");
  await fs.rename(temporary, output);
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const output = path.resolve(options.output);
  const bySlug = new Map((options.resume ? await readExisting(output) : []).map((problem) => [problem.slug, problem]));
  const catalogue = [];
  console.log("Fetching LeetCode problem catalogue...");
  for (let skip = 0; ; skip += options.pageSize) {
    const page = await getProblemPage(options.pageSize, skip);
    catalogue.push(...page.questions);
    console.log(`Catalogue: ${catalogue.length} problems`);
    if (!page.questions.length) break;
    if (Number.isFinite(options.limit) && catalogue.filter((item) => options.includePremium || !item.paidOnly).length >= options.limit) break;
    await sleep(options.delay);
  }
  const targets = catalogue.filter((item) => options.includePremium || !item.paidOnly).slice(0, options.limit);
  console.log(`Fetching ${targets.length} problem records (${bySlug.size} already saved)...`);
  for (let index = 0; index < targets.length; index += 1) {
    const basic = targets[index];
    if (bySlug.has(basic.titleSlug)) continue;
    console.log(`[${index + 1}/${targets.length}] ${basic.questionFrontendId}. ${basic.title}`);
    try {
      const details = await getProblemDetails(basic.titleSlug);
      if (!details) throw new Error("LeetCode returned no question data");
      bySlug.set(basic.titleSlug, makeProblemRecord(details));
      await saveDataset(output, [...bySlug.values()]);
    } catch (error) {
      console.error(`  Failed: ${error.message}`);
    }
    await sleep(options.delay);
  }
  const problems = [...bySlug.values()].sort((a, b) => Number(a.frontendId) - Number(b.frontendId));
  await saveDataset(output, problems);
  console.log(`Done. Saved ${problems.length} records to ${output}`);
}

main().catch((error) => { console.error("Fatal error:", error.message); process.exitCode = 1; });
