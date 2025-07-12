import express from 'express';
import {
    getUserProfile,
    updatePoints,
    updateProfile,
    getSwaprequest,
    getProductsRequested,
} from '../controllers/user.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js'; // Adjust the path as needed

const router = express.Router();


router.get('/profile', authenticateUser, getUserProfile);

router.put('/points', authenticateUser, updatePoints);

router.put('/profile-picture', authenticateUser, updateProfile);

router.get('/swap-requests', authenticateUser, getSwaprequest);

router.get('/products-requested', authenticateUser, getProductsRequested);

export default router;
