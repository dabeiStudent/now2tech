const { text } = require('body-parser');
const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    }
})

const Brand = mongoose.model('brand', BrandSchema);

module.exports = Brand
// Category.createIndexes( { "email": 1, "friends_email": 1 }, { unique: true } )
