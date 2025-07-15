import express from "express";
import {
  getPendingProducts,
  approveProduct,
  rejectProduct,
  deleteProduct,
  getAdminStats,
} from "../controllers/admin.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.use(protectRoute);
router.use(requireAdmin);

router.get("/products/pending", getPendingProducts);

router.patch("/products/:productId/approve", approveProduct);
router.patch("/products/:productId/reject", rejectProduct);

router.delete("/products/:productId", deleteProduct);

router.get("/stats", getAdminStats);

export default router;
