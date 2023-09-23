const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String
    },
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    passWord: {
        type: String,
        require: true
    },
    role: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String,
    }
})

const User = mongoose.model('user', UserSchema);
module.exports = User;