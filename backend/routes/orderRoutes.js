import express from 'express';
import { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrderToPaid, updateToDelivered } from '../controllers/orderController.js';
import { checkAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect,createOrder).get(protect, checkAdmin, getAllOrders);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect,checkAdmin,updateToDelivered);

export default router;