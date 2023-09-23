const mongoose = require('mongoose');
const User = require('./usersModel');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    user: {
        type: User.schema
    },
    anonymous: {
        type: User.schema
    },
    isVerified: {
        type: Boolean
    }
});

const Comments = mongoose.model('comment', CommentSchema);
module.exports = Comments;