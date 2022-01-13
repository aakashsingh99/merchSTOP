import express from 'express'
const router = express.Router();

import { authUser, getAllUsers, getUserProfile, registerUser, updateUserProfile } from '../controllers/userControllers.js'
import { protect, checkAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, checkAdmin, getAllUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

export default router;