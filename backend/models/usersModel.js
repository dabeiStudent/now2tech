const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passWord: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String,
    },
    getNotice: {
        type: Boolean
    }
})

const User = mongoose.model('user', UserSchema);
module.exports = User;