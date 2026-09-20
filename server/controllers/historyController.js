import History from "../models/History.js";

/**
 * POST /api/history
 * Save or update a user's analysis session.
 * If the user already analyzed this problem before:
 * - Do NOT create a duplicate record.
 * - Increment analysisCount.
 * - Update lastAnalyzedAt with current timestamp.
 * - Update stored analysis, language, difficulty, and title.
 * - Preserve firstAnalyzedAt.
 */
export const saveHistory = async (req, res) => {
  try {
    const {
      problemId: rawProblemId,
      title,
      language,
      difficulty,
      analysis,
    } = req.body;

    if (!title || !language) {
      return res.status(400).json({
        message: "title and language are required",
      });
    }

    // Determine unique problemId
    const problemId = (
      rawProblemId ||
      analysis?.problemSlug ||
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );

    const userId = req.user._id;

    // Check if user already has a record for this problem
    let history = await History.findOne({
      userId,
      $or: [{ problemId }, { title: title.trim() }],
    });

    if (history) {
      // Update existing record
      history.analysisCount = (history.analysisCount || 1) + 1;
      history.lastAnalyzedAt = new Date();
      history.problemId = problemId; // ensure problemId is set
      history.title = title.trim();
      history.language = language;
      if (difficulty) history.difficulty = difficulty;
      if (analysis) history.analysis = analysis;
      if (!history.firstAnalyzedAt) {
        history.firstAnalyzedAt = history.createdAt || new Date();
      }

      await history.save();

      return res.status(200).json({
        message: "History updated successfully",
        history,
      });
    }

    // Create new record for the first time
    history = await History.create({
      userId,
      problemId,
      title: title.trim(),
      language,
      difficulty: difficulty || analysis?.analysis?.difficulty || "Medium",
      analysis,
      analysisCount: 1,
      firstAnalyzedAt: new Date(),
      lastAnalyzedAt: new Date(),
    });

    return res.status(201).json({
      message: "History saved successfully",
      history,
    });
  } catch (error) {
    console.error("Save history error:", error);

    return res.status(500).json({
      message: "Failed to save history",
    });
  }
};

/**
 * GET /api/history
 * Get deduplicated history for the logged-in user, sorted by most recent analysis.
 */
export const getHistory = async (req, res) => {
  try {
    const history = await History.find({
      userId: req.user._id,
    }).sort({ lastAnalyzedAt: -1, updatedAt: -1, createdAt: -1 });

    return res.status(200).json(history);
  } catch (error) {
    console.error("Get history error:", error);

    return res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};