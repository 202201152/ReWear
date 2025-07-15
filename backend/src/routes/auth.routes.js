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
<<<<<<< HEAD
router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);
router.get('/checkAuth', protectRoute, checkAuth);

export default router
=======

// Public Routes
router.post("/login", login);
router.post("/signup", signup);

// Authenticated Routes
router.get("/logout", logout);
router.get("/checkAuth", protectRoute, checkAuth);

export default router;
>>>>>>> f5f952a61d420d702d5615234e3684f7ba64fe2f
