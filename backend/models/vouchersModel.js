const mongoose = require('mongoose');

const VoucherSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
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
    image: {
        type: String
    }
});

const Voucher = mongoose.model('voucher', VoucherSchema);

module.exports = Voucher;