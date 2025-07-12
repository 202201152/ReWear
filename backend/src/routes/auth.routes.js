import express from "express";
import { checkAuth, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);
router.get('/checkAuth', protectRoute, checkAuth);