import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{ 
        name: {type: String, required: true},
        quantity: {type: String, required: true},
        image: {type: String, reuqired: true},
        price: {type: String, required: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        }
    }],

    //DELIVERY
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        pincode: {type: Number, required: true},
        state: {type: String, required: true}
    },
    isDelivered:    {type: Boolean, required: true, default: false},
    deliveryDate:   {type: Date},
    
    //PAYMENT
    paymentMethod:  { type: String, required: true},
    paymentMode:    { type: String, required: true},
    paymentResult:  { 
        id: {type: String},
        status: {type: String},
        // updateTime: {type: String},
        paymentEmail: {type: String}
    },
    taxPrice:       { type: Number, required: true, default: 0.0},
    shippingPrice:  { type: Number, required: true, default: 0.0},
    totalPrice:     { type: Number, required: true, default: 0.0},
    isPaid:         {type: Boolean, required: false, default: false},
    paidAt:         {type: Date},
}, {
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema);
export default Order;