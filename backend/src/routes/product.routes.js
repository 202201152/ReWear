import express from "express";
import { createProduct, deleteProduct, editProduct, getAllProducts, searchProducts } from "../controllers/product.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get('/getProducts', getAllProducts);
router.post('/createProduct',protectRoute, createProduct);
router.get('/search', searchProducts);
router.delete('/deleteProduct',protectRoute, deleteProduct);
router.put('editProduct',protectRoute, editProduct);