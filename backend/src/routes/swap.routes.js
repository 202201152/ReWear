import express from 'express';
import {
    createSwapRequest,
    approveSwapRequest,
    getUserSwaps,
} from '../controllers/swap.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js'; // Assuming authentication middleware

const router = express.Router();

// Create a new swap request
router.post('/', authenticateUser, createSwapRequest);

// Approve a swap request by ID
router.put('/approve/:swapId', authenticateUser, approveSwapRequest);

// Get all swaps for the logged-in user
router.get('/', authenticateUser, getUserSwaps);

export default router;
