const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    desc: {
        type: String
    },
    parentCate: {
        type: Category
    },
    childCate: {
        type: Category
    },
    image: {
        type: String
    }
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;