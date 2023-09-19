const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    rate: {
        type: Number
    }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;