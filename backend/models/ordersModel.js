const mongoose = require('mongoose');
const Product = require('./productsModel');
const User = require('./usersModel');
const OrderSchema = new mongoose.Schema({
    user: {
        type: User,
        require: true
    },
    address: {
        type: String
    },
    items: {
        type: Array(Product.schema)
    },
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
