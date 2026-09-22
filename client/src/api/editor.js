import api from "../lib/axios";
import { fetchWithCache } from "../lib/cache";

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
 * Fetch standard LeetCode dataset test cases for a problem (cached for 10 minutes)
 */
export const fetchProblemTestCases = async (problem) => {
  const cleanKey = `testcases_${(problem || "").trim().toLowerCase()}`;
  return fetchWithCache(
    cleanKey,
    async () => {
      const { data } = await api.get("/editor/testcases", {
        params: { problem },
      });
      return data;
    },
    { ttl: 10 * 60 * 1000 }
  );
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
 * Search problems in the LeetCode dataset for problem switcher (cached for 5 minutes)
 */
export const searchDatasetProblems = async (query = "") => {
  const cleanKey = `search_problem_${(query || "").trim().toLowerCase()}`;
  return fetchWithCache(
    cleanKey,
    async () => {
      const { data } = await api.get("/editor/search", {
        params: { q: query },
      });
      return data;
    },
    { ttl: 5 * 60 * 1000 }
  );
};
