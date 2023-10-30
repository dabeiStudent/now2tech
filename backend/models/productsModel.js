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
        type: String
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
            stype: { type: String },
            sdetail: { type: String },
        }],
    vouchers: {
        type: mongoose.Schema.Types.ObjectId, ref: 'voucher',
        default: null
    },
    inStock: {
        type: Number
    },
    avgRating: { type: Number, default: 0 },
    numOfReview: { type: Number, default: 0 },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId, ref: 'user'
            },
            userName: { type: String },
            rating: { type: Number },
            comment: { type: String }
        }
    ]
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;