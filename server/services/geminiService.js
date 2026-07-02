import { getGeminiClient } from "../config/gemini.js";
import { getAnalysisPrompt } from "../prompts/analysisPrompt.js";

export const analyzeWithGemini = async (problem, language) => {

    const ai = getGeminiClient();

    const prompt = getAnalysisPrompt(problem, language);

    const response = await ai.models.generateContent({
        // model: "gemini-2.5-flash",
        model: "gemini-2.5-flash-lite",
        contents: prompt,
    });

    let text = response.text;
    text = text.replace(/```json/g,"")
                .replace(/```/g,"")
                    .trim();
    try {
        return JSON.parse(text);
    } catch (err) {
        console.error("Gemini Response:", text);
        throw new Error("Invalid JSON returned by Gemini.");
    }
};