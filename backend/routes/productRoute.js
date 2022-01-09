import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'
import mongooose from 'mongoose'

const router = express.Router();

// @desc    Fetch All Products
// @route   GET /api/products
// @route   Public
router.get('/', asyncHandler( async(req, res)=> {
    const products = await Product.find({})

    //Check Error
    // res.status(404);
    // throw new Error('Not Authorized');

    res.json(products);
}))

// @desc    Fetch Product by ID
// @route   GET /api/products/:id
// @route   Public
router.get('/:id', asyncHandler( async (req, res) => {
    try {
        if(!mongooose.isValidObjectId(req.params.id)){
            throw new Error('Not a valid Product ID');
        }

        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        } else {
            throw new Error('Product Not found')
        }
    } catch (error) {
        throw new Error(error.message);
    }
}))


export default router;