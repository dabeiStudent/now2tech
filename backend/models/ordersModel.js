const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    products: {
        type: Array,
        require: true
    },
    payment: {
        type: String
    },
    status: {
        type: String
    }
});

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
