import { GoogleGenAI } from "@google/genai";

let ai = null;

export const getGeminiClient = () => {
    if (!ai) {
        ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
    }

    return ai;
};