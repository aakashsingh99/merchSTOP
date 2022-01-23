import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'
import mongooose from 'mongoose'

// @desc    Fetch All Products
// @route   GET /api/products
// @route   Public
export const getProducts = asyncHandler( async(req, res) => {
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

    const products = await Product.find({ ...keyword })
    res.json(products);
})

// @desc    Fetch Product by ID
// @route   GET /api/products/:id
// @route   Public
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

// @desc    Delete a product by Id
// @route   DELETE /api/products/:id/
// @route   Public
export const deleteProductById = asyncHandler( async(req, res) => {
    if(!mongooose.isValidObjectId(req.params.id)){
        throw new Error('Not a valid Product ID');
    }
    const product = await Product.findById(req.params.id);
    if(product){
        await product.remove()
        res.json({message: 'Product Removed'});
    } else {
        throw new Error('Product Not found')
    }
})

// @desc    Create a product
// @route   POST /api/products/
// @route   Provate
export const createProduct = asyncHandler( async(req, res) => {
    const { name, image, description, brand, category, price, countInStock} = req.body;
    const product = await Product.create({
        user: req.user.id, name, image, description, brand, category, price, countInStock
    })
    if(product){
        res.status(201).json({
            _id: product._id,
            name: product.name,
            image: product.image,
            description: product.description,
            brand : product.brand,
            category: product.category,
            price : product.price,
            countInStock: product.countInStock
        })
    } else {
        throw new Error('Invalid User Data');
    }
})


// @desc    Update a product
// @route   PUT /api/products/
// @route   Private Admin   
export const createProductReview = asyncHandler( async(req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id)
    if(product){
        const reviewed = product.reviews.find(r=> r.user.toString() === req.user._id.toString())

        if(reviewed){
            res.status(400)
            throw new Error('Already Reviewed');
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404);
        throw new Error('Product Not Found')
    }
})

// @desc    Create a Review
// @route   POST /api/products/:id/review
// @route   Private
export const updateProduct = asyncHandler( async(req, res) => {
    const { name, image, description, brand, category, price, countInStock} = req.body;
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name || product.name
        product.price = price || product.price
        product.description = description || product.description
        product.image = image || product.image
        product.brand = brand || product.brand
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock

        const updatedProduct = await product.save();
        res.json(updatedProduct)

    } else {
        res.status(404);
        throw new Error('Product Not Found')
    }
})