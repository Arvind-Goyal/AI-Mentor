import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config({ path: ".env" });

import app from "./app.js";

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});