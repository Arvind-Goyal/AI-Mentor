import express from "express";
import {
  analyzeProblem,
  lookupProblemController,
} from "../controllers/analysisController.js";

const router = express.Router();

router.get("/lookup", lookupProblemController);
router.post("/", analyzeProblem);

export default router;