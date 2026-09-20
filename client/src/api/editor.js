import api from "../lib/axios";

/**
 * Execute code using free compiler service (no Judge0 required)
 */
export const runCode = async ({
  language,
  code,
  stdin = "",
  testCases = [],
  metadata = null,
}) => {
  const { data } = await api.post("/editor/execute", {
    language,
    code,
    stdin,
    testCases,
    metadata,
  });
  return data;
};

/**
 * Fetch standard LeetCode dataset test cases for a problem
 */
export const fetchProblemTestCases = async (problem) => {
  const { data } = await api.get("/editor/testcases", {
    params: { problem },
  });
  return data;
};

/**
 * Review user solution using Gemini AI
 */
export const reviewCode = async ({ problem, language, code }) => {
  const { data } = await api.post("/editor/review", {
    problem,
    language,
    code,
  });
  return data;
};

/**
 * Search problems in the LeetCode dataset for problem switcher
 */
export const searchDatasetProblems = async (query = "") => {
  const { data } = await api.get("/editor/search", {
    params: { q: query },
  });
  return data;
};

