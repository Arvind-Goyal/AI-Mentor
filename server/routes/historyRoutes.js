import express from "express";

import {
  saveHistory,
  getHistory,
} from "../controllers/historyController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveHistory);

router.get("/", protect, getHistory);

export default router;