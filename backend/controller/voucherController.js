const mongoose= require('mongoose');

const Voucher= require('../models/vouchersModel');
const Product= require('../models/productsModel');

const getAllVoucher= async (req, res)=> {
    let vouchers;
    
    try{
        vouchers= await Voucher.find();
    }catch (error){
        return res.status(404).json({err: error});
    }

    res.status(200).json(vouchers);
}

const createVoucher= async (req, res)=> {
    const {name, desc, percent, startDate, endDate}= req.body;
    
    const voucher= new Voucher({
        name,
        desc,
        percent,
        start: startDate,
        end: endDate,
    });

    try{
        await voucher.save();
    }catch (error){
        return res.status(404).json({err: "Không thể thêm voucher. Vui lòng thử lại sau."});
    }

    res.status(200).json({msg: "Thêm voucher thành công."});  
};

const addProductToVoucher= async (req, res)=>{
    const voucherId= req.params.vid;
    const productId= req.body;

    let existingVoucher;
    try{
        existingVoucher= await Voucher.findById(voucherId).populate('productList');
    }catch(error){
        return res.status(404).json({err: error});
    }

    if(!existingVoucher){
        return res.status(404).json({err: "Không tìm thấy voucher."});
    }

    

    // let existingProduct;
    // try{
    //     existingProduct= existingVoucher.productList.find(productId);
    // }catch(error){
    //     return res.status(404).json({err: error});
    // }


    // if(!existingProduct){
    //     return res.status(404).json({err: "Không tìm thấy sản phẩm."});
    // }

    // try{
    //     const sess= await mongoose.startSession();
    //     sess.startTransaction();
    //     await existingVoucher.productList.push(existingProduct);
    //     await existingVoucher.save();
    //     await existingProduct.vouchers.push(existingVoucher);
    //     await existingProduct.save();
    //     await sess.commitTransaction();
    // }catch(error){
    //     return res.status(404).json({err: "Không thể thêm. Vui lòng thử lại sau."})
    // }
    return res.status(200).json(existingVoucher.productList);
}

const getProductByVoucherId= async (req, res)=> {
    const voucherId= req.params.vid;
    console.log(req.params);
    let voucherWithProduct
    try {
        voucherWithProduct= await Voucher.findById(voucherId).populate('productList');
    } catch (error){
        return res.status(404).json({err: error});
    }

    res.status(200).json(voucherWithProduct.productList);
}

module.exports = { createVoucher, addProductToVoucher, getAllVoucher, getProductByVoucherId };