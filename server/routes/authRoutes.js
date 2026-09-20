import express from "express";

import {
  signup,
  login,
  logout,
  me,
  forgotPassword,
  resetPassword,
  checkUsernameAvailability,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check-username", checkUsernameAvailability);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/me", protect, me);

export default router;