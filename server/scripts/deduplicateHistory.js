import "dotenv/config";
import connectDB from "../config/db.js";
import History from "../models/History.js";
import { parseProblemInput } from "../services/leetcodeService.js";

const deduplicate = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for history deduplication.");

    const allHistories = await History.find({}).sort({ createdAt: 1 });
    console.log(`Inspecting ${allHistories.length} history records...`);

    const userProblemMap = new Map(); // key: `${userId}_${normalizedId}`

    for (const record of allHistories) {
      // Determine normalized problem identifier
      let pid = record.problemId;
      if (!pid) {
        const parsed = parseProblemInput(record.title);
        if (parsed?.slug) {
          pid = parsed.slug;
        } else if (parsed?.frontendId) {
          pid = parsed.frontendId;
        } else if (record.analysis?.problemTitle) {
          pid = record.analysis.problemTitle
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-");
        } else {
          pid = record.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .slice(0, 60);
        }
      }

      const key = `${record.userId.toString()}_${pid}`;

      if (!userProblemMap.has(key)) {
        record.problemId = pid;
        record.analysisCount = record.analysisCount || 1;
        record.firstAnalyzedAt = record.firstAnalyzedAt || record.createdAt;
        record.lastAnalyzedAt = record.lastAnalyzedAt || record.createdAt;
        if (record.analysis?.problemTitle) {
          record.title = record.analysis.problemTitle;
        }
        userProblemMap.set(key, record);
      } else {
        // Merge into the existing record
        const primary = userProblemMap.get(key);
        primary.analysisCount = (primary.analysisCount || 1) + (record.analysisCount || 1);
        if (new Date(record.createdAt) > new Date(primary.lastAnalyzedAt)) {
          primary.lastAnalyzedAt = record.createdAt;
          primary.analysis = record.analysis;
          primary.language = record.language;
          primary.difficulty = record.difficulty || primary.difficulty;
        }
        if (new Date(record.createdAt) < new Date(primary.firstAnalyzedAt)) {
          primary.firstAnalyzedAt = record.createdAt;
        }
        // Mark the duplicate record for deletion
        await History.findByIdAndDelete(record._id);
        console.log(`Deleted duplicate history #${record._id} for problem: "${primary.title}"`);
      }
    }

    // Save all primary records
    for (const record of userProblemMap.values()) {
      await record.save();
    }

    const remainingCount = await History.countDocuments();
    console.log(`Deduplication complete. History records reduced to ${remainingCount} unique records.`);
    process.exit(0);
  } catch (error) {
    console.error("Deduplication error:", error);
    process.exit(1);
  }
};

deduplicate();
