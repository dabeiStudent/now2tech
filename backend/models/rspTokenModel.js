const mongoose = require('mongoose');

const rspTokenSchema = new mongoose.Schema({
    rspToken: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        required: true
    },
    expireAt: {
        type: Date,
        required: true
    }
});

const rspToken = mongoose.model('rsptoken', rspTokenSchema);
module.exports = rspToken