import "dotenv/config";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const sanitizeUsername = (raw) => {
  return raw
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_.-]/g, "")
    .slice(0, 30);
};

const migrate = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for username migration.");

    const users = await User.find({});
    console.log(`Found ${users.length} users to inspect.`);

    const usedUsernames = new Set();

    // First collect all valid, non-empty usernames
    for (const user of users) {
      if (user.username && user.username.trim()) {
        const clean = sanitizeUsername(user.username);
        user.username = clean;
        usedUsernames.add(clean);
      }
    }

    // Now assign unique usernames to users missing one or having an invalid one
    for (const user of users) {
      if (!user.username || user.username.trim() === "") {
        let base = "";
        if (user.email) {
          base = sanitizeUsername(user.email.split("@")[0]);
        }
        if (!base || base.length < 3) {
          base = sanitizeUsername(user.name || "coder");
        }
        if (base.length < 3) {
          base = "user_" + Math.floor(1000 + Math.random() * 9000);
        }

        let candidate = base;
        let counter = 1;
        while (usedUsernames.has(candidate)) {
          candidate = `${base}${counter}`;
          counter++;
        }

        user.username = candidate;
        usedUsernames.add(candidate);
        console.log(`Assigned username "${candidate}" to user: ${user.name} (${user.email})`);
      }
      await user.save({ validateBeforeSave: false });
    }

    console.log("Username migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Username migration failed:", error);
    process.exit(1);
  }
};

migrate();
