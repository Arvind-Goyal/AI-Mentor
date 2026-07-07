import express from "express";
import { reviewCode } from "../controllers/editorController.js";

const router = express.Router();

router.post("/review",reviewCode);
export default router;