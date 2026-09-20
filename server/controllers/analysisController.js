import {
  getOrGenerateAnalysis,
  lookupProblem,
} from "../services/leetcodeService.js";

/**
 * POST /api/analyze
 * Analyzes a problem statement, LeetCode URL, or question number.
 * First checks DB / pre-computed dataset for cache hit, otherwise invokes Gemini and caches.
 */
export const analyzeProblem = async (req, res) => {
  try {
    const {
      problem,
      language = "Java",
      mode = "Detailed",
      difficulty = "Auto Detect",
    } = req.body;

    if (!problem || !String(problem).trim()) {
      return res.status(400).json({
        success: false,
        message: "Problem statement, question number, or LeetCode URL is required.",
      });
    }

    const analysis = await getOrGenerateAnalysis(
      String(problem).trim(),
      language,
      { mode, difficulty }
    );

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error("Analysis Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to analyze problem",
    });
  }
};

/**
 * GET /api/analyze/lookup?q=...
 * Quickly looks up a LeetCode problem by number, URL, or title for live preview.
 */
export const lookupProblemController = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !String(q).trim()) {
      return res.status(200).json({
        success: true,
        problem: null,
      });
    }

    const problem = await lookupProblem(String(q).trim());

    return res.status(200).json({
      success: true,
      problem,
    });
  } catch (error) {
    console.error("Lookup Problem Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to lookup problem",
    });
  }
};
