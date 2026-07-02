import { analyzeWithGemini } from "../services/geminiService.js";

export const analyzeProblem = async (req, res) => {

    try {

        const { problem, language } = req.body;

        if (!problem) {
            return res.status(400).json({
                success: false,
                message: "Problem statement is required."
            });
        }

        const analysis = await analyzeWithGemini(problem, language);

        return res.status(200).json({
            success: true,
            data: analysis
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};