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
    quantity: {
        type: Number
    }, 
    products: [{
        type: mongoose.Types.ObjectId, ref: 'product'
    }]
});

const Voucher = mongoose.model('voucher', VoucherSchema);
module.exports = Voucher;