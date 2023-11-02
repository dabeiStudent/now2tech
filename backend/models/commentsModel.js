const mongoose = require('mongoose');
const User = require('./usersModel');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product',
        default: null
    },
    user: {
        name: { type: String },
        email: { type: String },
        phoneNumber: { type: String },
        isAdmin: { type: Boolean, default: false }
    },
    replies: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'comment', default: []}
    ]
    // anonymous: {
    //     type: User.schema
    // },
    // isVerified: {
    //     type: Boolean
    // }
});

const Comments = mongoose.model('comment', CommentSchema);
module.exports = Comments;