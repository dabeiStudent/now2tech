const mongoose = require('mongoose');
const User = require('./usersModel');
const Product = require('./productsModel');

const RatingSchema = new mongoose.Schema({
    content: {
        type: String
    },
    rate: {
        type: Number
    },
    image: {
        type: String
    },
    user: {
        type: User.schema
    },
    product: {
        type: Product.schema
    }
});

const Rating = mongoose.model('rating', RatingSchema);
module.exports = Rating;