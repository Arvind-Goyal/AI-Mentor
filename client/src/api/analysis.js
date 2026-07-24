import api from "../lib/axios";

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