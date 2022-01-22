import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js'

// @desc    Create nee Order
// @POST    /api/order
// @access  PRIVATE
export const createOrder = asyncHandler( async(req, res) => {
    const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice} = req.body;
    
    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No Items found');
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
})

// @desc    Get Order By ID
// @POST    /api/order/:id
// @access  PRIVATE
export const getOrderById = asyncHandler( async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email _id');
    if(order){
        if(order.user._id.equals(req.user._id)){
            res.json(order);
        } else{
            res.status(404);
            throw new Error('Order Not found for this profile')
        }
    } else {
        res.status(404);
        throw new Error('Order Not found');
    }
})

// @desc    Update order to paid
// @POST    PUT /api/order/:id
// @access  PRIVATE
export const updateOrderToPaid = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        if(order.user._id.equals(req.user._id)){
            verifySignature(order._id, req.body.payment_id)
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult ={
                payment_id: req.body.payment_id,
                order_id: req.body.order_id,
                signature: req.body.signature,
                status: req.body.status,
            }
            const updatedOrder = await order.save();
            console.log(order);
            console.log(updatedOrder);
            res.json(updatedOrder);
        } else{
            res.status(404);
            throw new Error('Order Not found for this profile')
        }
    } else {
        res.status(404);
        throw new Error('Order Not found');
    }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})
  
// @desc    Get All orders
// @route   GET /api/orders
// @access  Private
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders)
})
  
// @desc    Update order to paid
// @POST    PUT /api/order/:id/deliver
// @access  PRIVATE
export const updateToDelivered = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);
    if(order){
            order.isDelivered = true
            order.deliveryDate = Date.now()
            // order.isPaid = true
            const updatedOrder = await order.save();
            res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order Not Updated');
    }
})
