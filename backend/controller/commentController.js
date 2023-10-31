const mongoose= require('mongoose');

const Comment= require('../models/commentsModel');
const Product= require('../models/productsModel');

const addComment= async(req, res)=> {
    const productId= req.params.pid;
    let product;
    try {
        product= await Product.findById(productId);        
    } catch (error) {
        return res.status(404).json({err: 'Đã có lỗi xảy ra khi tìm sản phẩm.'});        
    }

    if(!product){
        return res.status(404).json({err: "Không tìm thấy sản phẩm."});
    }

    const comment= new Comment({
        content: req.body.content,
        product: productId,
        user: {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        }
    })

    try {
        const sess= await mongoose.startSession();
        sess.startTransaction();
        product.comments.push(comment);
        await product.save();
        await comment.save();
        await sess.commitTransaction();        
    } catch (error) {
        return res.status(404).json({err: "Đã có lỗi xảy ra."});       
        // console.log(error) 
    }
    res.status(200).json({msg: "Comment thành công."});
};

const getCommentByProductId= async (req, res)=>{
    const productId= req.params.pid;

    let comments;

    try {
        comments= await Comment.find({product: productId})
    } catch (error) {
        return res.status(404).json({err: 'Đã có lỗi xảy ra.'});
    }

    res.status(200).json(comments);
}

module.exports= {
    addComment,
    getCommentByProductId
}