import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String}
}, {
    timestamps: true,
})

const productSchema = mongoose.Schema({
    // User reference for every product Added
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: { type: String, required: true},
    image: { type: String, required: true},
    description: {type: String, required: true, default:''},
    brand: { type: String, required: true, default:''},
    category: {type: String, required: true, default:''},
    price: {type: Number, required: true, default:0},
    countInStock: {type: Number, required: true, default:0},
    reviews : [{type: reviewSchema, ref:'Review'}],
    rating: {type: Number, required: true, default:0},
    numReviews: {type: Number, required: true, default:0}
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema)
export default Product