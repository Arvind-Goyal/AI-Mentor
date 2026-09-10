import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import analysisRoutes from "./routes/analysisRoutes.js";
import editorRoutes from "./routes/editorRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

app.use("/api/analyze", analysisRoutes);
app.use("/api/editor", editorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);

export default app;