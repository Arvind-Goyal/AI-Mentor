import History from "../models/History.js";

/*
  POST /api/history
  Save a user's analysis session
*/
export const saveHistory = async (req, res) => {
  try {
    const {
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

    const history = await History.create({
      userId: req.user._id,
      title,
      language,
      difficulty,
      analysis,
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

/*
  GET /api/history
  Get history for the logged-in user
*/
export const getHistory = async (req, res) => {
  try {
    const history = await History.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(history);
  } catch (error) {
    console.error("Get history error:", error);

    return res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};