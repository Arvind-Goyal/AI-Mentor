import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    problemSlug: {
      type: String,
      required: true,
      index: true,
      trim: true,
      lowercase: true,
    },

    frontendId: {
      type: String,
      index: true,
      default: "",
    },

    problemTitle: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    // The complete learning roadmap / analysis payload
    analysis: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Unique compound index so each problem + language has only one cached analysis
analysisSchema.index({ problemSlug: 1, language: 1 }, { unique: true });

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
