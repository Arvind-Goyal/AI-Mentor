import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic Account Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    // Profile Information
    profilePicture: {
      type: String,
      default: "",
    },

    banner: {
      type: String,
      default: "",
    }, 

    bio: {
      type: String,
      maxlength: 160,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      maxlength: 100,
      default: "",
      trim: true,
    },

    socialLinks: {
      linkedin: {
        type: String,
        default: "",
        trim: true,
      },

      github: {
        type: String,
        default: "",
        trim: true,
      },

      leetcode: {
        type: String,
        default: "",
        trim: true,
      },

      portfolio: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // Social Information
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Authentication
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export default User;