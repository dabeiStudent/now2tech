const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    sku: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    importPrice: {
        type: Number
    },
    sellPrice: {
        type: Number
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
    specs: [
        {
            stype: {type: String },
            sdetail: {type: String},
        }],
    vouchers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'voucher'
    }],
    inStock: {
        type: Number
    }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;