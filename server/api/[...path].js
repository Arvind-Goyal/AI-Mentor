import "dotenv/config";
import connectDB from "../config/db.js";
import app from "../app.js";

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Catch-all Vercel function is working",
  });
});

await connectDB();

export default app;