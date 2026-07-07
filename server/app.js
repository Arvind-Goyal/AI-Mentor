import express from "express";
import cors from "cors";
// import dotenv from "dotenv";

import analysisRoutes from "./routes/analysisRoutes.js";
import editorRoutes from "./routes/editorRoutes.js";


// dotenv.config();
// console.log(process.env.GEMINI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analyze", analysisRoutes);
app.use("/api/editor", editorRoutes);

export default app;