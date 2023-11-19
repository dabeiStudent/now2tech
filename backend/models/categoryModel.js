const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    keyword: {
        type: String
    }
});

const Category = mongoose.model('category', CategorySchema);
// Category.createIndexes( { "email": 1, "friends_email": 1 }, { unique: true } )
module.exports = Category;