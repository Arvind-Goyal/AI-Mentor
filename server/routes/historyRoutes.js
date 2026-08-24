import express from "express";
import History from "../models/History.js";

const router = express.Router();

/*
  POST /api/history
  Save a user's analysis session
*/
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      title,
      language,
      difficulty,
      analysis,
    } = req.body;

    if (!userId || !title || !language) {
      return res.status(400).json({
        message: "userId, title and language are required",
      });
    }

    const history = await History.create({
      userId,
      title,
      language,
      difficulty,
      analysis,
    });

    res.status(201).json({
      message: "History saved successfully",
      history,
    });
  } catch (error) {
    console.error("Save history error:", error);

    res.status(500).json({
      message: "Failed to save history",
    });
  }
});

/*
  GET /api/history/:userId
  Get all history for a user
*/
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await History.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error("Get history error:", error);

    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
});

export default router;