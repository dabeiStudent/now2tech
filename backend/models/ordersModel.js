const mongoose = require('mongoose');
const Product = require('./productsModel');
const User = require('./usersModel');
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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
        type: String
    },
    method: {
        type: String
    },
    paymentStatus: {
        type: String
    },
    price: {
        type: Number
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
