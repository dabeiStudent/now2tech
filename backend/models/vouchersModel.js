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
    productList: [{type: mongoose.Schema.Types.ObjectId, ref: 'product'}]
    // productList: [
    //     {
    //         qty: {type: Number},
    //         used: {type: Number},
    //         product: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "product"}
    //         }]
});

const Voucher = mongoose.model('voucher', VoucherSchema);
module.exports = Voucher;