import express from "express";
import {
  analyzeProblem,
  lookupProblemController,
} from "../controllers/analysisController.js";

import { analysisRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/lookup", lookupProblemController);
router.post("/", analysisRateLimiter, analyzeProblem);

export default router;