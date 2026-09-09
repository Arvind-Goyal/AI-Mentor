import express from "express";

import {
  searchUsers,
  getUserProfile,
  getUserFollowers,
  getUserFollowing,
} from "../controllers/userController.js";

import {
  getUserAchievements,
} from "../controllers/profileController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", protect, searchUsers);

router.get(
  "/:username/followers",
  protect,
  getUserFollowers
);

router.get(
  "/:username/following",
  protect,
  getUserFollowing
);

router.get(
  "/:username/achievements",
  protect,
  getUserAchievements
);

router.get(
  "/:username",
  protect,
  getUserProfile
);

export default router;