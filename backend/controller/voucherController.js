const mongoose= require('mongoose');

const Voucher= require('../models/vouchersModel');
const Product= require('../models/productsModel');

const createVoucher= async (req, res)=> {
    const {name, desc, percent, startDate, endDate, quantity}= req.body;
    
    const createdVoucher= new Voucher({
        name,
        desc, 
        start: startDate,
        end: endDate,
        percent,
        quantity
    });
        
    try{
        await createdVoucher.save();
    }catch (error){
        return res.status(404).json({err: err});
    }
    return res.status(200).json({msg: "Thêm voucher thành công."});     
};

const addProductForVoucher= async (req, res)=>{
    const {voucherId, productId}= req.body;

    let existingVoucher;
    try{
        existingVoucher= await Voucher.findById(voucherId);
    }catch(error){
        return res.status(404).json({err: error});
    }

    if(!existingVoucher){
        return res.status(404).json({err: "Khong tim thay voucher."});
    }

    let existingProduct;
    try{
        existingProduct= await Product.findById(productId);
    }catch(error){
        return res.status(404).json({err: error});
    }

    if(!existingProduct){
        return res.status(404).json({err: "Khong tim thay san pham da chon."});
    }

    try{
        const sess= await mongoose.startSession();
        sess.startTransaction();
        await existingVoucher.products.push(existingProduct);
        await existingVoucher.save();
        await sess.commitTransaction();
    }catch(error){
        return res.status(404).json({err: "Khong the them san pham."})
    }
    return res.status(200).json({msg: "Them thanh cong."})
}

module.exports = { createVoucher, addProductForVoucher };