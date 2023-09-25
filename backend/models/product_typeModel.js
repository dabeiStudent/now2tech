const mongoose = require('mongoose');

const Product_typeSchema = new mongoose.Schema({
    SKU: {
        type: String
    },
    productName: {
        type: String
    },
    typeName: {
        type: String
    },
    importPrice: {
        type: Number
    },
    sellPrice: {
        type: Number
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number
    },
    image: {
        type: String
    },
    voucher: {
        type: String
    }
});

const Product_type = mongoose.model('product_type', Product_typeSchema);
module.exports = Product_type;