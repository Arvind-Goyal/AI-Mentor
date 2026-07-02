import express from "express";
import { analyzeProblem } from "../controllers/analysisController.js";

const router = express.Router();

router.post("/", analyzeProblem);

export default router;