const mongoose= require('mongoose');

const Voucher= require('../models/vouchersModel');
const Product= require('../models/productsModel');

const createVoucher= async (req, res)=> {
    const {name, desc, percent, productList, startDate, endDate}= req.body;

    if(productList && productList.length === 0){
        return res.status(400).json({err: "Chua chon san pham"});
    }

    let existingProduct;
    productList.map( async (product) => {
        existingProduct= await Product.findById(product);
        if(!existingProduct){
            return res.status(404).json({err: "Khong tim thay san pham da chon."});
        }
    });
    
    const voucher= new Voucher({
        name,
        desc,
        percent,
        start: startDate,
        end: endDate,
        productList
    });

    try{
        await voucher.save();
    }catch (error){
        return res.status(404).json({err: error});
    }
    // const voucherFound= await Voucher.findById('651412ccb1240c755bfec97d').populate("productList");

    // voucherFound.productList.forEach((p)=>{
    //     console.log(p.name);
    // })
    // console.log(voucherFound);
    
    res.status(200).json({msg: "voucherFound.productList"});  
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