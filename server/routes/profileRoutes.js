import express from "express";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  uploadBanner,
  getAchievements,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
} from "../controllers/profileController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);

router.post(
  "/avatar",
  protect,
  upload.single("avatar"),
  uploadAvatar
);

router.post(
  "/banner",
  protect,
  upload.single("banner"),
  uploadBanner
);

router.get(
  "/achievements",
  protect,
  getAchievements
);

router.get(
  "/followers",
  protect,
  getFollowers
);

router.get(
  "/following",
  protect,
  getFollowing
);

router.post(
  "/follow/:userId",
  protect,
  followUser
);

router.delete(
  "/follow/:userId",
  protect,
  unfollowUser
);

export default router;