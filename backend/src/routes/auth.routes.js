// backend/routes/auth.routes.js
import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Routes
router.post("/login", login);
router.post("/signup", signup);

// Authenticated Routes
router.get("/logout", logout);
router.get("/checkAuth", protectRoute, checkAuth);

export default router;
