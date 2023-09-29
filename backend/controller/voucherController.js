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

const getVoucherById= async (req, res)=> {
    const voucherId= req.params.vid;

    let voucher;
    try {
        voucher= await Voucher.findById(voucherId);
    }catch (err){
        return res.status(404).json({err: "Đã có lỗi xảy ra. Vui lòng thử lại sau."});
    }

    if(!voucher){
        return res.status(404).json({err: "Không tìm thấy voucher."});
    }

    res.status(200).json(voucher);
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
    const {productId}= req.body;

    let existingVoucher;
    try{
        existingVoucher= await Voucher.findById(voucherId).populate('productList');
    }catch(error){
        return res.status(404).json({err: error});
    }

    if(!existingVoucher){
        return res.status(404).json({err: "Không tìm thấy voucher."});
    }

    let productInVoucher;
    productInVoucher= existingVoucher.productList.find(product=> product.equals(productId));

    if(productInVoucher){
        return res.status(404).json({err: "Sản phẩm đã được thêm vào trước đó."});
    }

    let existingProduct;
    try{ 
        existingProduct= await Product.findById(productId);
    } catch(error){
        return res.status(404).json({err: error})
    }

    if(!existingProduct){
        return res.status(404).json({err: "Không tìm thấy sản phẩm."});
    }

    try{
        const sess= await mongoose.startSession();
        sess.startTransaction();
        await existingVoucher.productList.push(existingProduct);
        await existingVoucher.save();
        await existingProduct.vouchers.push(existingVoucher);
        await existingProduct.save();
        await sess.commitTransaction();
    }catch(error){
        return res.status(404).json({err: "Không thể thêm. Vui lòng thử lại sau."})
    }
    return res.status(200).json({msg: "Thêm thành công."});
}

const removeProductFromVoucher= async (req, res)=>{
    const voucherId= req.params.vid;
    const {productId}= req.body;

    let existingVoucher;
    try{
        existingVoucher= await Voucher.findById(voucherId).populate('productList');
    }catch(error){
        return res.status(404).json({err: error});
    }

    if(!existingVoucher){
        return res.status(404).json({err: "Không tìm thấy voucher."});
    }

    let productInVoucher;
    productInVoucher= existingVoucher.productList.find(product=> product.equals(productId));

    if(!productInVoucher){
        return res.status(404).json({err: "Sản phẩm không thuộc khuyến mãi này."});
    }

    let existingProduct;
    try{ 
        existingProduct= await Product.findById(productId);
    } catch(error){
        return res.status(404).json({err: error})
    }

    if(!existingProduct){
        return res.status(404).json({err: "Không tìm thấy sản phẩm."});
    }

    try{
        const sess= await mongoose.startSession();
        sess.startTransaction();
        await existingVoucher.productList.pop(existingProduct);
        await existingVoucher.save();
        await existingProduct.vouchers.pop(existingVoucher);
        await existingProduct.save();
        await sess.commitTransaction();
    }catch(error){
        return res.status(404).json({err: "Không thể xóa. Vui lòng thử lại sau."})
    }
    return res.status(200).json({msg: "Đã xóa xong."});
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

const updateVoucher= async (req, res)=> {
    const voucherId= req.params.vid;
    const { name, desc, percent, startDate, endDate }= req.body;

    let existingVoucher;
    try {
        existingVoucher= await Voucher.findById(voucherId);
    }catch (err){
        return res.status(404).json({err: err});
    }

    if(!existingVoucher){
        return res.status(404).json({err: "Không tìm thấy voucher. Vui lòng thử lại sau."});
    }

    existingVoucher.name= name;
    existingVoucher.desc= desc;
    existingVoucher.percent= percent;
    existingVoucher.start= startDate;
    existingVoucher.end= endDate;

    try{
        await existingVoucher.save();
    }catch(err){
        return res.status(404).json({err: err})
    }

    res.status(200).json({msg: "Cập nhật thành công."});

}

const deleteVoucher= async (req, res)=>{
    const voucherId= req.params.vid;

    let voucher;
    try{
        voucher= await Voucher.findById(voucherId).populate('productList');
    }catch (err){
        return res.status(404).json({err: "Không thể xóa. Vui lòng thử lại sau."});
    }

    if(!voucher){
        return res.status(400).json({err: "Không tìm thấy voucher. Vui lòng thử lại sau."});
    };

    try {
        const sess= await mongoose.startSession();
        sess.startTransaction();
        voucher.productList.map(async (product)=> {
            product.vouchers.pop(voucher)
            await product.save();
        })
        await voucher.deleteOne();
        await sess.commitTransaction();
    }catch(err){
        return res.status(404).json({err: "Không thể xóa. Đã có lỗi xảy ra."})
    }

    res.status(200).json({msg: "Đã xóa."})
}

module.exports = { 
    createVoucher,
    addProductToVoucher, 
    getAllVoucher, 
    getVoucherById,
    getProductByVoucherId,
    removeProductFromVoucher,
    updateVoucher,
    deleteVoucher };