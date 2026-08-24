import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
    },

    language: {
      type: String,
    },

    analysis: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("History", historySchema);