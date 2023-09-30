const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    parentCate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        default: null
    },
    image: {
        type: String
    }
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;