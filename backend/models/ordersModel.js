const mongoose = require('mongoose');
const Product = require('./productsModel');
const User = require('./usersModel');
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    address: {
        type: String
    },
    items: [{
        name: { type: String },
        qty: { type: Number },
        image: { type: String },
        price: { type: Number },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        },
    },],
    status: {
        type: String,
        enum: ['Not_proccessed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Not_proccessed'
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'VNPAY']
    },
    paymentStatus: {
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date }
    },
    price: {
        type: Number, 
    },
    shippingFee: {
        type: Number
    },
    totalPrice: {
        type: Number
    }
});

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
