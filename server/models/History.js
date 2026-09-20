import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      default: "Medium",
    },

    language: {
      type: String,
      default: "Java",
    },

    analysisCount: {
      type: Number,
      default: 1,
    },

    firstAnalyzedAt: {
      type: Date,
      default: Date.now,
    },

    lastAnalyzedAt: {
      type: Date,
      default: Date.now,
    },

    analysis: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to quickly find user's history for a specific problem
historySchema.index({ userId: 1, problemId: 1 });

export default mongoose.model("History", historySchema);