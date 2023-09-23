const mongoose = require('mongoose');
const User = require('./usersModel');

const TokenSchema = new mongoose.Schema({
    token: {
        type: String
    },
    user: {
        type: User.schema
    },
    createAt: {
        type: Date
    },
    expires: {
        type: Date
    }
});

const Token = mongoose.model('tokens', TokenSchema);
module.exports = Token; 