// services/editorService.js

import {getGeminiClient} from "../config/gemini.js";
import { reviewPrompt } from "../prompts/reviewPrompt.js";

export const generateReview = async ({
  problem,
  language,
  code,
}) => {

  const prompt = reviewPrompt(problem, language, code);
  const ai = getGeminiClient();
  
      const response = await ai.models.generateContent({
          // model: "gemini-2.5-flash",
          model: "gemini-2.5-flash-lite",
          contents: prompt,
      });

//   const response = await result.text;

  let text = response.text;
    text = text.replace(/```json/g,"")
                .replace(/```/g,"")
                    .trim();
  // console.log(text);
  try {
        return JSON.parse(text);
    } catch (err) {
        console.error("Gemini Response:", text);
        throw new Error("Invalid JSON returned by Gemini.");
    }};