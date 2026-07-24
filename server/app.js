import express from "express";
import cors from "cors";
// import dotenv from "dotenv";

import analysisRoutes from "./routes/analysisRoutes.js";
import editorRoutes from "./routes/editorRoutes.js";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";



// dotenv.config();
// console.log(process.env.GEMINI_API_KEY);

const app = express();

// app.use(cors());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());

app.use(cookieParser());

app.use("/api/analyze", analysisRoutes);
app.use("/api/editor", editorRoutes);
app.use("/api/auth", authRoutes);

export default app;