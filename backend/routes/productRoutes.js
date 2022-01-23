import express from 'express';
import {getProducts, getProductById, deleteProductById, updateProduct,createProduct, createProductReview} from '../controllers/productControllers.js'
import { protect, checkAdmin } from '../middleware/authMiddleware.js'

const router = express.Router();
router.route('/').get(getProducts)
    .post(protect, checkAdmin, createProduct);
router.route('/:id/review').post(protect, createProductReview)
router.route('/:id').get(getProductById)
    .delete(protect, checkAdmin, deleteProductById)
    .put(protect,checkAdmin, updateProduct);

export default router;