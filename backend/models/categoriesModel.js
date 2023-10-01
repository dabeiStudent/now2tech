const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    isMainCate: {type: Boolean},
    mainCate: {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
    subCate: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        default: []
    }],
    image: {
        type: String
    }
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;