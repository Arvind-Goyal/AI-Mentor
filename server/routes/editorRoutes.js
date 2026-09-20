import express from "express";
import { reviewCode, runCode, getProblemTestcases, searchProblemsController } from "../controllers/editorController.js";

const router = express.Router();

router.get("/search", searchProblemsController);
router.get("/testcases", getProblemTestcases);
router.post("/execute", runCode);
router.post("/review", reviewCode);

export default router;