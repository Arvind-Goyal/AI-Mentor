import api from "../lib/axios";

/**
 * Lookup LeetCode problem by number, URL, or title
 */
export const lookupQuestion = async (query) => {
    const { data } = await api.get(`/analyze/lookup?q=${encodeURIComponent(query)}`);
    return data;
};

/**
 * Analyze a LeetCode problem
 */
export const analyzeQuestion = async (payload) => {
    const response= await api.post("/analyze", payload);
    return response;
};

/**
 * Review user's solution and return optimized solution
 */
export const reviewSolution = async (payload) => {
    const response = await api.post("/editor/review", payload);
    return response;
};