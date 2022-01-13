import express from 'express';
import {getProducts, getProductById} from '../controllers/productControllers.js'

const router = express.Router();

// @desc    Fetch All Products
// @route   GET /api/products
// @route   Public
router.route('/').get(getProducts);

// @desc    Fetch Product by ID
// @route   GET /api/products/:id
// @route   Public
router.route('/:id').get(getProductById);

export default router;