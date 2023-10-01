const mongoose = require('mongoose');

const rspTokenSchema = new mongoose.Schema({
    rspToken: {
        type: Object,
        required: true
    },
    createAt: {
        type: Date,
        required: true
    },
});

const rspToken = mongoose.model('rsptoken', rspTokenSchema);
module.exports = rspToken