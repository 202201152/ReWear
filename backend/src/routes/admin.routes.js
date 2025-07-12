// backend/src/routes/admin.routes.js
import express from "express";
import { getAllUsers, deleteUser, getAllProductsAdmin, getAllSwaps } from "../controllers/admin.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.use(protectRoute, requireAdmin); // middleware chain

router.get("/users", getAllUsers);
router.delete("/users/:userId", deleteUser);

router.get("/products", getAllProductsAdmin);
router.get("/swaps", getAllSwaps);

export default router;
