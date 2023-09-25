const mongoose = require('mongoose');
const Product_type = require('./product_typeModel');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pimage: {
        type: String
    },
    desc: {
        type: String
    },
    tags: {
        type: Array
    },
    release: {
        type: Date
    },
    made: {
        type: String
    },
    brand: {
        type: String
    },
    category: {
        type: String
    },
    ptype: {
        type: Array(Product_type.schema)
    },
    inStock: {
        type: Boolean
    }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;