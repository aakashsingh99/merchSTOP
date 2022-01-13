import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'
import mongooose from 'mongoose'

export const getProducts = asyncHandler( async(req, res) => {
    const products = await Product.find({});
    res.json(products);
})

export const getProductById = asyncHandler( async(req, res) => {
    if(!mongooose.isValidObjectId(req.params.id)){
        throw new Error('Not a valid Product ID');
    }
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    } else {
        throw new Error('Product Not found')
    }
})