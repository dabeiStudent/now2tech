const mongoose = require('mongoose');

const Comment = require('../models/commentsModel');
const Product = require('../models/productsModel');
const User = require('../models/usersModel');

const addComment = async (req, res) => {
    const productId = req.params.pid;
    let product;
    try {
        product = await Product.findById(productId);
    } catch (error) {
        return res.status(404).json({ err: 'Đã có lỗi xảy ra khi tìm sản phẩm.' });
    }

    if (!product) {
        return res.status(404).json({ err: "Không tìm thấy sản phẩm." });
    }

    const comment = new Comment({
        content: req.body.content,
        product: productId,
        user: {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        }
    })

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        product.comments.push(comment);
        await product.save();
        await comment.save();
        await sess.commitTransaction();
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra." });
        // console.log(error) 
    }
    res.status(200).json({ msg: "Comment thành công." });
};

const getCommentByProductId = async (req, res) => {
    const productId = req.params.pid;

    let comments;

    try {
        comments = await Comment.find({ product: productId }).populate('replies');
    } catch (error) {
        return res.status(404).json({ err: 'Đã có lỗi xảy ra.' });
    }

    res.status(200).json(comments);
};

const replyComment = async (req, res) => {
    const commentId = req.params.cmtid;

    let existComment;
    try {
        existComment = await Comment.findById(commentId);
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra khi tìm bình luận." });
    }

    if (!existComment) {
        return res.status(404).json({ err: "Không tìm thấy bình luận." });
    }

    const comment = new Comment({
        content: req.body.content,
        user: {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        },
    });

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        existComment.replies.push(comment);
        await existComment.save();
        await comment.save();
        await sess.commitTransaction();
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra." });
    }

    res.status(200).json({ msg: "Phản hồi thành công." });
};

const loggedComment = async (req, res) => {
    const productId = req.params.pid;
    const userId = req.data.uid;
    let product;
    try {
        product = await Product.findById(productId);
    } catch (error) {
        return res.status(404).json({ err: 'Đã có lỗi xảy ra khi tìm sản phẩm.' });
    }

    if (!product) {
        return res.status(404).json({ err: "Không tìm thấy sản phẩm." });
    }

    let existUser;
    try {
        existUser = await User.findById(userId);
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra." });
    }

    if (!existUser) {
        return res.status(404).json({ err: "Không tìm thấy user." });
    }

    const comment = new Comment({
        content: req.body.content,
        product: productId,
        user: {
            name: existUser.userName,
            phoneNumber: existUser.phoneNumber,
            email: existUser.email
        }
    })

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        product.comments.push(comment);
        await product.save();
        await comment.save();
        await sess.commitTransaction();
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra." });
    }
    res.status(200).json({ msg: "Comment thành công." });
};

const loggedReplyComment = async (req, res) => {
    const commentId = req.params.cmtid;
    const userId = req.data.uid;

    let existComment;
    try {
        existComment = await Comment.findById(commentId);
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra khi tìm bình luận." });
    }

    if (!existComment) {
        return res.status(404).json({ err: "Không tìm thấy bình luận." });
    }

    let existUser;
    try {
        existUser = await User.findById(userId);
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra." });
    }

    if (!existUser) {
        return res.status(404).json({ err: "Không tìm thấy user." });
    }

    let comment;
    if (existUser.role === 'admin') {
        comment = new Comment({
            content: req.body.content,
            user: {
                name: existUser.userName,
                email: existUser.email,
                phoneNumber: existUser.phoneNumber,
                isAdmin: true
            },
        });
    } else {
        comment = new Comment({
            content: req.body.content,
            user: {
                name: existUser.userName,
                email: existUser.email,
                phoneNumber: existUser.phoneNumber
            },
        });
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        existComment.replies.push(comment);
        await existComment.save();
        await comment.save();
        await sess.commitTransaction();
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra." });
    }

    res.status(200).json({ msg: "Phản hồi thành công." });
};
const removeComment = async (req, res) => {
    const mainComment = await Comment.findById(req.params.cid);

    if (!mainComment) {
        return res.status(404).json({ err: "Không thấy" });
    }

    try {
        await Promise.all(mainComment.replies.map(async (subCommentId) => {
            const subCommentFound = await Comment.findById(subCommentId);
            if (subCommentFound) {
                await subCommentFound.deleteOne();
            }
        }));
    } catch (err) {
        return res.status(500).json({ err: err });
    }

    await mainComment.deleteOne();
    return res.status(200).json({ msg: "Đã xóa" }); s
}
module.exports = {
    addComment,
    getCommentByProductId,
    replyComment,
    loggedComment,
    loggedReplyComment,
    removeComment
}