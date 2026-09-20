import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Analysis from "../models/Analysis.js";
import { analyzeWithGemini } from "./geminiService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROBLEMS_PATH = path.resolve(
  __dirname,
  "../../leetcode-scraper/leetcode-problems.json"
);

const SOLUTIONS_PATH = path.resolve(
  __dirname,
  "../../leetcode-scraper/leetcode-java-solutions.json"
);

// In-memory indexes for fast lookups from the LeetCode dataset
let localProblemsLoaded = false;
let localByFrontendId = new Map();
let localBySlug = new Map();
let localByMethodName = new Map();
let localSolutionsBySlug = new Map();

// In-flight analyses map for request deduplication (Single-flight pattern)
// Prevents multiple concurrent LLM calls for the same problem statement
const inFlightAnalyses = new Map();

/**
 * Lazily loads the local LeetCode dataset into in-memory maps.
 * Problems are NOT saved to the database.
 */
const ensureLocalDatasetLoaded = () => {
  if (localProblemsLoaded) return;

  try {
    if (fs.existsSync(SOLUTIONS_PATH)) {
      const rawSolutions = fs.readFileSync(SOLUTIONS_PATH, "utf8");
      const solutionsData = JSON.parse(rawSolutions);
      for (const item of solutionsData) {
        if (item.slug && item.solution) {
          localSolutionsBySlug.set(item.slug.toLowerCase(), {
            ...item.solution,
            embeddingText: item.embeddingText,
            source: item.source,
          });
        }
      }
    }

    if (fs.existsSync(PROBLEMS_PATH)) {
      const rawProblems = fs.readFileSync(PROBLEMS_PATH, "utf8");
      const problemsData = JSON.parse(rawProblems);
      for (const p of problemsData) {
        const fId = String(p.frontendId || p.id || "").trim();
        const slug = String(p.slug || "").trim().toLowerCase();
        if (fId) localByFrontendId.set(fId, p);
        if (slug) localBySlug.set(slug, p);

        // Index by method name for instant method-to-problem resolution
        if (p.metadata) {
          try {
            const meta = typeof p.metadata === "string" ? JSON.parse(p.metadata) : p.metadata;
            if (meta.name) {
              const mKey = meta.name.toLowerCase().replace(/[^a-z0-9]/g, "");
              if (!localByMethodName.has(mKey)) {
                localByMethodName.set(mKey, p);
              }
            }
          } catch (e) {}
        }
      }
    }

    localProblemsLoaded = true;
    console.log(
      `Loaded LeetCode dataset into memory: ${localBySlug.size} problems, ${localByMethodName.size} methods, ${localSolutionsBySlug.size} Java solutions.`
    );
  } catch (error) {
    console.error("Failed to load LeetCode dataset into memory:", error);
    localProblemsLoaded = true;
  }
};

/**
 * Parse arbitrary user input to determine if it's a URL, number, slug, or title.
 */
export const parseProblemInput = (input) => {
  if (!input || typeof input !== "string") return null;
  const raw = input.trim();

  // 1. LeetCode URL: e.g. https://leetcode.com/problems/two-sum/
  const urlMatch = raw.match(
    /(?:https?:\/\/)?(?:www\.)?leetcode\.com\/problems\/([a-zA-Z0-9_-]+)/i
  );
  if (urlMatch && urlMatch[1]) {
    return {
      type: "url",
      slug: urlMatch[1].toLowerCase(),
      raw,
    };
  }

  // 2. Question number: e.g. "1", "#1", "No. 42"
  const numberMatch = raw.match(/^(?:#|no\.?|problem)?\s*(\d+)\s*$/i);
  if (numberMatch && numberMatch[1]) {
    return {
      type: "number",
      frontendId: numberMatch[1],
      raw,
    };
  }

  // 3. Number prefixed title: e.g. "1. Two Sum"
  const titleNumberMatch = raw.match(/^(\d+)[\.\s]+(.*)$/);
  if (titleNumberMatch && titleNumberMatch[1]) {
    return {
      type: "number",
      frontendId: titleNumberMatch[1],
      title: titleNumberMatch[2].trim(),
      raw,
    };
  }

  // 4. Slug format: e.g. "two-sum", "trapping-rain-water"
  if (/^[a-z0-9]+(?:-[a-z0-9]+)+$/i.test(raw)) {
    return {
      type: "slug",
      slug: raw.toLowerCase(),
      raw,
    };
  }

  // 5. Short string that could be a title (< 80 chars and single line)
  if (raw.length < 80 && !raw.includes("\n")) {
    return {
      type: "title",
      title: raw,
      raw,
    };
  }

  // 6. Free-form problem statement text
  return {
    type: "statement",
    statement: raw,
    raw,
  };
};

/**
 * Find problem in the in-memory LeetCode dataset (NEVER saves to DB).
 */
export const findProblemInDataset = (parsed) => {
  if (!parsed) return null;
  ensureLocalDatasetLoaded();

  // 1. Direct method name match (e.g. "twoSum", "reverseList", "isPalindrome")
  if (parsed.raw) {
    const cleanRaw = parsed.raw.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (localByMethodName.has(cleanRaw)) {
      return localByMethodName.get(cleanRaw);
    }
  }

  if (parsed.slug) {
    const slugLower = parsed.slug.toLowerCase();
    if (localBySlug.has(slugLower)) return localBySlug.get(slugLower);
    const cleanSlug = slugLower.replace(/[^a-z0-9]/g, "");
    if (localByMethodName.has(cleanSlug)) return localByMethodName.get(cleanSlug);
  }

  if (parsed.frontendId) {
    return localByFrontendId.get(String(parsed.frontendId)) || null;
  }

  if (parsed.title) {
    const cleanTitle = parsed.title.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (localByMethodName.has(cleanTitle)) {
      return localByMethodName.get(cleanTitle);
    }

    const slugCandidate = parsed.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const foundBySlug = localBySlug.get(slugCandidate);
    if (foundBySlug) return foundBySlug;

    // Search by title case-insensitive / prefix matching
    const titleLower = parsed.title.toLowerCase().trim();
    for (const prob of localBySlug.values()) {
      if (prob.title) {
        const probLower = prob.title.toLowerCase();
        if (
          probLower === titleLower ||
          titleLower.startsWith(probLower) ||
          probLower.startsWith(titleLower)
        ) {
          return prob;
        }
      }
    }
  }

  return null;
};

/**
 * Extracts structured test cases from a problem dataset item.
 */
export const extractProblemTestCases = (problem) => {
  if (!problem) return [];

  // 1. If explicit examples array exists and has valid items
  if (Array.isArray(problem.examples) && problem.examples.length > 0) {
    return problem.examples.map((ex, idx) => ({
      caseIndex: idx + 1,
      input: ex.input || "",
      output: ex.output || "",
      explanation: ex.explanation || null,
    }));
  }

  // 2. Extract from statement text
  const text = problem.statementText || problem.statementHtml || "";
  const regex = /Example\s*\d*:\s*Input:\s*(.+?)\s*Output:\s*(.+?)(?=(?:Explanation:|Example|\n\n\n|Constraints:|$))/gis;
  const list = [];
  let m;
  let idx = 1;
  while ((m = regex.exec(text)) !== null) {
    list.push({
      caseIndex: idx++,
      input: m[1].trim().replace(/\n/g, " "),
      output: m[2].trim().replace(/\n/g, " "),
      explanation: null,
    });
  }

  // 3. Fallback to sampleTestCase or exampleTestcases if regex didn't find anything
  if (list.length === 0 && (problem.sampleTestCase || problem.exampleTestcases)) {
    const raw = problem.sampleTestCase || problem.exampleTestcases;
    list.push({
      caseIndex: 1,
      input: raw.trim(),
      output: "",
      explanation: null,
    });
  }

  return list;
};

/**
 * Direct lookup of test cases and problem metadata from both LeetCode datasets.
 */
export const getTestCasesForProblem = (queryStr) => {
  if (!queryStr || typeof queryStr !== "string") return { testCases: [], metadata: null };
  ensureLocalDatasetLoaded();

  const parsed = parseProblemInput(queryStr);
  const problem = findProblemInDataset(parsed);
  const slug = (parsed?.slug || problem?.slug || queryStr).toLowerCase().trim();

  let javaSol = localSolutionsBySlug.get(slug);

  // 1. Check problem dataset
  if (problem) {
    const testCases = extractProblemTestCases(problem);
    if (testCases.length > 0) {
      return {
        testCases,
        metadata: problem.metadata || null,
        sampleTestCase: problem.sampleTestCase || "",
        title: problem.title,
        slug: problem.slug,
        frontendId: problem.frontendId,
        difficulty: problem.difficulty,
        codeSnippets: problem.codeSnippets || [],
        statementText: problem.statementText || problem.statementHtml || "",
      };
    }
  }

  // 2. Check Java solutions embeddingText for test cases
  if (javaSol && javaSol.embeddingText) {
    const extracted = extractProblemTestCases({ statementText: javaSol.embeddingText });
    if (extracted.length > 0) {
      return {
        testCases: extracted,
        metadata: problem?.metadata || null,
        sampleTestCase: problem?.sampleTestCase || "",
        title: problem?.title || slug,
        slug,
        frontendId: problem?.frontendId || "",
        difficulty: problem?.difficulty || "Medium",
        codeSnippets: problem?.codeSnippets || [],
        statementText: javaSol.embeddingText || "",
      };
    }
  }

  // 3. Fallback
  if (problem) {
    return {
      testCases: extractProblemTestCases(problem),
      metadata: problem.metadata || null,
      sampleTestCase: problem.sampleTestCase || "",
      title: problem.title,
      slug: problem.slug,
      frontendId: problem.frontendId,
      difficulty: problem.difficulty,
      codeSnippets: problem.codeSnippets || [],
      statementText: problem.statementText || problem.statementHtml || "",
    };
  }

  return { testCases: [], metadata: null };
};

/**
 * Search problems in the dataset for fast UI autocomplete / problem switcher.
 */
export const searchProblems = (query = "", limit = 25) => {
  ensureLocalDatasetLoaded();
  const q = (query || "").toLowerCase().trim();
  const results = [];

  if (!q) {
    const popularIds = ["1", "2", "3", "20", "21", "53", "70", "121", "206", "226", "238", "242", "704"];
    for (const id of popularIds) {
      const p = localByFrontendId.get(id);
      if (p) {
        results.push({
          frontendId: p.frontendId,
          title: p.title,
          slug: p.slug,
          difficulty: p.difficulty,
          topics: (p.topics || []).map((t) => t.name || t),
        });
      }
    }
    return results;
  }

  const cleanQ = q.replace(/[^a-z0-9]/g, "");

  for (const p of localBySlug.values()) {
    if (results.length >= limit) break;
    const fId = String(p.frontendId || "");
    const titleLower = (p.title || "").toLowerCase();
    const slugLower = (p.slug || "").toLowerCase();

    if (
      fId === q ||
      fId === q.replace(/^#/, "") ||
      titleLower.includes(q) ||
      slugLower.includes(q) ||
      (cleanQ && titleLower.replace(/[^a-z0-9]/g, "").includes(cleanQ))
    ) {
      results.push({
        frontendId: p.frontendId,
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        topics: (p.topics || []).map((t) => t.name || t),
      });
    }
  }

  return results;
};

/**
 * Construct an analysis response using pre-generated Java solutions.
 */
export const buildAnalysisFromJavaSolution = (problem, javaSolution) => {
  const snippets = problem.codeSnippets || [];
  const getSnippet = (lang) => {
    const found = snippets.find(
      (s) =>
        s.languageSlug === lang.toLowerCase() ||
        s.language?.toLowerCase().includes(lang.toLowerCase())
    );
    return found ? found.code : "";
  };

  const difficulty = problem.difficulty || "Medium";
  const estimatedTime =
    difficulty === "Easy"
      ? "15 minutes"
      : difficulty === "Hard"
      ? "45 minutes"
      : "30 minutes";

  const topicsList = (problem.topics || []).map((t) => t.name || t);

  return {
    problemTitle: problem.title,
    isCached: true,
    source: "precomputed_dataset",
    testCases: extractProblemTestCases(problem),
    sampleTestCase: problem.sampleTestCase || "",
    exampleTestcases: problem.exampleTestcases || "",
    metadata: problem.metadata || null,
    template: {
      java:
        getSnippet("java") ||
        "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}",
      cpp:
        getSnippet("cpp") ||
        "class Solution {\npublic:\n    // Your code here\n};",
      python:
        getSnippet("python3") ||
        getSnippet("python") ||
        "class Solution:\n    # Your code here",
      javascript:
        getSnippet("javascript") ||
        "/**\n * @return {any}\n */\nvar solution = function() {\n    // Your code here\n};",
    },
    mentor: {
      goal:
        javaSolution.summary ||
        `Solve ${problem.title} using the ${
          javaSolution.approachName || "optimal"
        } approach.`,
      estimatedTime,
      confidence: 99,
      motivation: `Mastering ${problem.title} strengthens your pattern recognition for ${
        topicsList.slice(0, 2).join(" & ") || "algorithmic problem solving"
      }. Aim to understand the invariants before writing code!`,
      advice: {
        title: javaSolution.approachName || "Optimal Insight",
        description:
          javaSolution.summary ||
          "Focus on identifying which state or previous computation can be reused to achieve optimal time complexity.",
      },
      status: {
        state: "Not Started",
        difficulty,
        estimatedTime,
        progress: 0,
      },
      mistakes: [
        "Jumping to brute force with quadratic nested loops without considering lookup optimizations.",
        "Overlooking boundary constraints such as empty collections or maximum values.",
        "Failing to account for extra auxiliary space used in recursion or hash structures.",
      ],
    },
    analysis: {
      difficulty,
      summary:
        javaSolution.summary ||
        problem.statementText?.slice(0, 300) ||
        `Given the problem constraints, find an optimal solution for ${problem.title}.`,
      concepts:
        topicsList.length > 0 ? topicsList : ["Algorithms", "Data Structures"],
      companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    },
    hint1: {
      text:
        problem.hints?.[0] ||
        "What properties of the input can you exploit to avoid unnecessary comparisons?",
    },
    hint2: {
      text:
        problem.hints?.[1] ||
        (javaSolution.approachName
          ? `Consider how a ${javaSolution.approachName} strategy simplifies this problem.`
          : "Consider using auxiliary storage like a hash set, map, or two pointers."),
    },
    hint3: {
      text:
        problem.hints?.[2] ||
        "Notice how the complement or remaining problem space narrows down once each element is processed.",
    },
    algorithm: {
      steps:
        Array.isArray(javaSolution.algorithm) &&
        javaSolution.algorithm.length > 0
          ? javaSolution.algorithm
          : [
              "Understand constraints and edge conditions.",
              "Initialize required data structures.",
              "Iterate through input elements and apply core logic.",
              "Return the validated result.",
            ],
    },
    pseudocode: {
      code: `function solve(${problem.slug || "input"}):\n  // Approach: ${
        javaSolution.approachName || "Optimal Solution"
      }\n  ${
        Array.isArray(javaSolution.algorithm)
          ? javaSolution.algorithm
              .map((s, idx) => `${idx + 1}. ${s}`)
              .join("\n  ")
          : "// Optimal step-by-step logic"
      }`,
    },
    review: {
      strengths: [
        `Tests fundamental competence in ${
          topicsList.join(", ") || "core DSA patterns"
        }.`,
        "Frequently asked in top tech company interview loops.",
        "Demonstrates trade-offs between time and space complexity.",
      ],
      improvements: [
        "Double-check edge cases before submitting.",
        "Write clean, modular code with descriptive variable naming.",
      ],
    },
    optimized: {
      complexity: {
        time: javaSolution.timeComplexity || "O(n)",
        space: javaSolution.spaceComplexity || "O(n)",
      },
      code: javaSolution.javaCode || "",
    },
  };
};

/**
 * Main service method:
 * 1. Resolves problem from local LeetCode dataset.
 * 2. Checks MongoDB if analysis already exists for (problemSlug, language).
 *    -> If yes, returns DB analysis immediately (0 LLM calls).
 * 3. If not, generates via precomputed dataset or Gemini, saves ONLY the analysis to DB, and returns.
 */
const executeGetOrGenerateAnalysis = async (
  problemInput,
  language = "Java",
  options = {},
  parsedInput = null
) => {
  const normalizedLang = (language || "java").toLowerCase();
  const { mode = "Detailed", difficulty: requestedDifficulty = "Auto Detect" } = options;
  const parsed = parsedInput || parseProblemInput(problemInput);

  let problem = null;
  if (parsed && parsed.type !== "statement") {
    problem = findProblemInDataset(parsed);
  }

  // If problem is identified from LeetCode dataset
  if (problem) {
    const slug = problem.slug.toLowerCase();
    const frontendId = String(problem.frontendId || problem.id || "");
    const title = problem.title;

    // 1. Check if analysis is already saved in the database!
    const existingAnalysis = await Analysis.findOne({
      problemSlug: slug,
      language: normalizedLang,
    });

    const testCases = extractProblemTestCases(problem);
    const sampleTestCase = problem.sampleTestCase || "";
    const exampleTestcases = problem.exampleTestcases || "";
    const metadata = problem.metadata || null;

    if (existingAnalysis && existingAnalysis.analysis) {
      console.log(
        `[DB CACHE HIT] Analysis for #${frontendId} (${title}) in ${language} found in DB!`
      );
      return {
        ...existingAnalysis.analysis,
        testCases: existingAnalysis.analysis.testCases?.length
          ? existingAnalysis.analysis.testCases
          : testCases,
        sampleTestCase: existingAnalysis.analysis.sampleTestCase || sampleTestCase,
        exampleTestcases: existingAnalysis.analysis.exampleTestcases || exampleTestcases,
        metadata: existingAnalysis.analysis.metadata || metadata,
        isCached: true,
        source: "database",
      };
    }

    // 2. Check if pre-generated solution exists in dataset for Java
    ensureLocalDatasetLoaded();
    let generatedAnalysis = null;

    const snippets = problem.codeSnippets || [];
    const getSnippet = (langKey) => {
      const target = langKey.toLowerCase();
      const found = snippets.find(
        (s) =>
          s.languageSlug === target ||
          s.language?.toLowerCase() === target ||
          (target === "python" && (s.languageSlug === "python3" || s.language?.toLowerCase() === "python3"))
      );
      return found ? found.code : "";
    };

    const officialTemplates = {
      java: getSnippet("java") || "class Solution {\n    // Write your code here\n}",
      cpp: getSnippet("cpp") || "class Solution {\npublic:\n    // Write your code here\n};",
      python: getSnippet("python3") || getSnippet("python") || "class Solution:\n    # Write your code here",
      javascript: getSnippet("javascript") || "/**\n * @return {any}\n */\nvar solution = function() {\n    // Write your code here\n};",
    };

    if (
      (normalizedLang === "java" || normalizedLang === "java 17") &&
      localSolutionsBySlug.has(slug)
    ) {
      console.log(
        `[DATASET MATCH] Using pre-computed Java solution for #${frontendId} (${title})`
      );
      const javaSol = localSolutionsBySlug.get(slug);
      generatedAnalysis = buildAnalysisFromJavaSolution(problem, javaSol);
    } else {
      // 3. Call Gemini with context from the LeetCode dataset
      console.log(
        `[LLM CALL] Generating grounded analysis with Gemini for #${frontendId} (${title}) in ${language} (Mode: ${mode})`
      );

      const promptContext = `
LeetCode #${frontendId}: ${title}
Difficulty: ${requestedDifficulty !== "Auto Detect" ? requestedDifficulty : problem.difficulty}
Topics: ${(problem.topics || []).map((t) => t.name || t).join(", ")}
Analysis Mode: ${mode}

Problem Statement:
${problem.statementText || problem.statementHtml || title}

Constraints:
${(problem.constraints || []).join("\n")}

Hints:
${(problem.hints || []).join("\n")}
`.trim();

      const targetSnippet =
        normalizedLang === "java"
          ? officialTemplates.java
          : normalizedLang === "cpp" || normalizedLang === "c++"
          ? officialTemplates.cpp
          : normalizedLang === "javascript" || normalizedLang === "js"
          ? officialTemplates.javascript
          : officialTemplates.python;

      generatedAnalysis = await analyzeWithGemini(promptContext, language, {
        mode,
        difficulty: requestedDifficulty,
        groundingData: {
          isGrounded: true,
          officialTitle: title,
          frontendId,
          officialSnippet: targetSnippet,
        },
      });

      if (!generatedAnalysis.problemTitle) {
        generatedAnalysis.problemTitle = title;
      }
    }

    // Always ground and attach official starter templates directly from dataset (saves LLM tokens)
    generatedAnalysis.template = {
      java: officialTemplates.java || generatedAnalysis.template?.java || "",
      cpp: officialTemplates.cpp || generatedAnalysis.template?.cpp || "",
      python: officialTemplates.python || generatedAnalysis.template?.python || "",
      javascript: officialTemplates.javascript || generatedAnalysis.template?.javascript || "",
    };
    generatedAnalysis.starterTemplates = generatedAnalysis.template;

    // Attach dataset test cases and metadata to the generated analysis
    generatedAnalysis.testCases = testCases;
    generatedAnalysis.sampleTestCase = sampleTestCase;
    generatedAnalysis.exampleTestcases = exampleTestcases;
    generatedAnalysis.metadata = metadata;

    if (requestedDifficulty !== "Auto Detect") {
      if (generatedAnalysis.analysis) {
        generatedAnalysis.analysis.difficulty = requestedDifficulty;
      }
      if (generatedAnalysis.mentor?.status) {
        generatedAnalysis.mentor.status.difficulty = requestedDifficulty;
      }
    }

    // 4. Save ONLY the analysis to the MongoDB Analysis collection!
    try {
      await Analysis.findOneAndUpdate(
        { problemSlug: slug, language: normalizedLang },
        {
          problemSlug: slug,
          frontendId,
          problemTitle: title,
          language: normalizedLang,
          analysis: generatedAnalysis,
        },
        { upsert: true, returnDocument: "after" }
      );
      console.log(
        `[SAVED TO DB] Saved analysis for #${frontendId} (${title}) in ${language} to database.`
      );
    } catch (saveErr) {
      console.error("Failed to save analysis to DB:", saveErr);
    }

    return {
      ...generatedAnalysis,
      isCached: false,
      source: "generated",
    };
  }

  // 5. Custom problem statement (not in LeetCode dataset)
  console.log(`[CUSTOM] Calling Gemini for custom problem in ${language}`);
  const customAnalysis = await analyzeWithGemini(problemInput, language);
  const customTestCases = extractProblemTestCases({ statementText: problemInput });
  return {
    ...customAnalysis,
    testCases: customAnalysis.testCases || customTestCases,
    isCached: false,
    source: "gemini_api",
  };
};

/**
 * Main service entrypoint:
 * Wraps executeGetOrGenerateAnalysis with in-flight promise deduplication.
 * Ensures that simultaneous/rapid requests for the same problem reuse the
 * same active promise, preventing duplicate Gemini LLM calls.
 */
export const getOrGenerateAnalysis = async (
  problemInput,
  language = "Java",
  options = {}
) => {
  const normalizedLang = (language || "java").toLowerCase();
  const { mode = "Detailed", difficulty: requestedDifficulty = "Auto Detect" } = options;
  const parsed = parseProblemInput(problemInput);

  // Compute normalized deduplication key
  const identifier = parsed?.slug || parsed?.frontendId || String(problemInput).trim().toLowerCase().slice(0, 120);
  const dedupKey = `${identifier}::${normalizedLang}::${mode}::${requestedDifficulty}`;

  // If already in-flight, reuse existing promise (0 duplicate LLM calls)
  if (inFlightAnalyses.has(dedupKey)) {
    console.log(
      `[DEDUPLICATION] Active in-flight analysis for "${dedupKey}" found. Reusing active execution (0 duplicate LLM calls).`
    );
    return await inFlightAnalyses.get(dedupKey);
  }

  // Create new execution promise and store in inFlight map
  const analysisPromise = executeGetOrGenerateAnalysis(
    problemInput,
    language,
    options,
    parsed
  );

  inFlightAnalyses.set(dedupKey, analysisPromise);

  try {
    const result = await analysisPromise;
    return result;
  } finally {
    // Release key when execution completes (success or failure)
    inFlightAnalyses.delete(dedupKey);
  }
};

/**
 * Fast lookup from in-memory LeetCode dataset without saving anything to DB.
 */
export const lookupProblem = async (queryStr) => {
  if (!queryStr || !queryStr.trim()) return null;

  const parsed = parseProblemInput(queryStr);
  if (!parsed) return null;

  const problem = findProblemInDataset(parsed);
  if (!problem) return null;

  const slug = problem.slug.toLowerCase();

  // Check if an analysis already exists in DB
  const hasAnalysis = await Analysis.exists({ problemSlug: slug });

  return {
    frontendId: String(problem.frontendId || problem.id || ""),
    title: problem.title,
    slug,
    difficulty: problem.difficulty,
    topics: (problem.topics || []).map((t) => t.name || t),
    acceptanceRate: problem.acceptanceRate,
    url: problem.url || `https://leetcode.com/problems/${slug}/`,
    hasCachedAnalysis: Boolean(hasAnalysis),
  };
};

/**
 * Daily recommendations directly from the in-memory dataset (no DB saving).
 */
export const getDailyRecommendations = async () => {
  try {
    ensureLocalDatasetLoaded();

    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );

    const easyCandidates = [
      "two-sum",
      "valid-parentheses",
      "best-time-to-buy-and-sell-stock",
      "reverse-linked-list",
      "climbing-stairs",
    ];
    const mediumCandidates = [
      "3sum",
      "container-with-most-water",
      "longest-substring-without-repeating-characters",
      "coin-change",
      "maximum-subarray",
    ];
    const hardCandidates = [
      "trapping-rain-water",
      "lru-cache",
      "merge-k-sorted-lists",
      "regular-expression-matching",
    ];

    const pickSlug = (arr) => arr[dayOfYear % arr.length];

    const pickedSlugs = [
      pickSlug(easyCandidates),
      pickSlug(mediumCandidates),
      pickSlug(hardCandidates),
    ];

    const results = [];
    for (const slug of pickedSlugs) {
      const prob = findProblemInDataset({ slug });
      if (prob) {
        results.push({
          frontendId: String(prob.frontendId || prob.id || ""),
          title: prob.title,
          slug: prob.slug.toLowerCase(),
          difficulty: prob.difficulty,
          topics: (prob.topics || []).map((t) => t.name || t).slice(0, 2),
          url: prob.url || `https://leetcode.com/problems/${prob.slug}/`,
        });
      }
    }

    return results;
  } catch (err) {
    console.error("Error getting daily recommendations:", err);
    return [];
  }
};
