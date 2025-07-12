import express from "express";
import { createProduct, deleteProduct, editProduct, getAllProducts, searchProducts } from "../controllers/product.controller.js";
const router = express.Router();

router.get('/getProducts', getAllProducts);
router.post('/createProduct', createProduct);
router.get('/search', searchProducts);
router.delete('/deleteProduct', deleteProduct);
router.put('editProduct', editProduct);