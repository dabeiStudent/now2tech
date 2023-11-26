const mongoose = require('mongoose');

const VoucherSchema = new mongoose.Schema({
    name: {
        type: String
    },
    desc: {
        type: String
    },
    percent: {
        type: Number
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    productList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            default: [],
            unique: true
        }
    ],
    image: {
        type: String
    }
});

const Voucher = mongoose.model('voucher', VoucherSchema);

module.exports = Voucher;