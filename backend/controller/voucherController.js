const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Voucher = require('../models/vouchersModel');
const Product = require('../models/productsModel');

const getAllVoucher = async (req, res) => {
    let vouchers;

    try {
        vouchers = await Voucher.find();
    } catch (error) {
        return res.status(404).json({ err: error });
    }

    res.status(200).json(vouchers);
}


const getVoucherById = async (req, res) => {
    const voucherId = req.params.vid;
    Voucher.findById(voucherId)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json({ err: err });
        })
}
const getVoucherByName = async (req, res) => {
    const voucherName = req.query.vname;
    Voucher.findOne({ name: voucherName })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json({ err: err });
        })
}

const createVoucher = async (req, res) => {
    const { name, desc, percent, startDate, endDate } = req.body;
    const image = req.file.filename;

    const voucher = new Voucher({
        name,
        desc,
        percent,
        start: startDate,
        end: endDate,
        image: image
    });

    try {
        await voucher.save();
        return res.status(200).json({ msg: "Đã thêm thành công" });
    } catch (error) {
        return res.status(404).json({ err: "Không thể thêm voucher. Vui lòng thử lại sau." });
    }
};
const getProductForVoucher = async (req, res) => {
    try {
        const productFount = await Product.find({ voucher: null })
        if (productFount) {
            return res.status(200).json(productFount);
        }
        return res.status(404).json({ err: "Không thấy" });
    } catch (err) {
        return res.status(500).json({ err: err });
    }
}

const addProductToVoucher = async (req, res) => {
    const voucherId = req.params.vid;
    const { products } = req.body;
    for (const productId of products) {
        const updateProduct = await Product.findOne({ _id: productId }).exec();
        if (!updateProduct) {
            return res.status(404).json({ err: "Không tìm thấy" });
        }
        const voucherFound = await Voucher.findById(voucherId).exec();
        if (!voucherFound) {
            return res.status(404).json({ err: "Không tìm thấy" });
        }
        try {
            updateProduct.voucher = voucherFound.name;
            updateProduct.save();
        } catch (err) {
            return res.status(401).json({ err: err.message });
        }
    }
    return res.status(200).json({ msg: "Đã thêm" });
}

const getProductOfVoucher = async (req, res) => {
    const voucherId = req.params.vid;
    const voucherFound = await Voucher.findById(voucherId);
    if (!voucherFound) {
        return res.status(404).json({ err: "Không thấy" });
    }
    const productFound = await Product.find({ voucher: voucherFound.name });
    if (!productFound) {
        return res.status(404).json({ err: "Không thấy" });
    }
    return res.status(200).json(productFound)
}

const removeProductFromVoucher = async (req, res) => {
    const productFound = await Product.findById(req.params.pid);
    if (!productFound) {
        return res.status(404).json({ err: "Không thấy" });
    }
    productFound.voucher = null;
    productFound.save();
    return res.status(200).json({ msg: "Đã xóa thành công" });
}

const getProductByVoucherId = async (req, res) => {
    const voucherId = req.params.vid;
    // console.log(req.params)
    let voucherWithProduct
    try {
        voucherWithProduct = await Voucher.findById(voucherId).populate('productList');
    } catch (error) {
        return res.status(404).json({ err: error });
    }

    res.status(200).json(voucherWithProduct.productList);
}

const updateVoucher = async (req, res) => {
    const voucherId = req.params.vid;
    const { name, desc, percent, startDate, endDate } = req.body;

    let existingVoucher;
    try {
        existingVoucher = await Voucher.findById(voucherId);
    } catch (err) {
        return res.status(404).json({ err: err });
    }

    if (!existingVoucher) {
        return res.status(404).json({ err: "Không tìm thấy voucher. Vui lòng thử lại sau." });
    }

    existingVoucher.name = name;
    existingVoucher.desc = desc;
    existingVoucher.percent = percent;
    existingVoucher.start = startDate;
    existingVoucher.end = endDate;

    try {
        await existingVoucher.save();
    } catch (err) {
        return res.status(404).json({ err: err })
    }

    res.status(200).json({ msg: "Cập nhật thành công." });

}

const deleteVoucher = async (req, res) => {
    const voucherId = req.params.vid;
    const voucherFound = await Voucher.findById(voucherId);
    if (!voucherFound) {
        return res.status(404).json({ err: "Không thấy" });
    }
    const productFound = await Product.find({ voucher: voucherFound.name });

    if (productFound) {
        const currentPath = process.cwd();
        const imgLink = currentPath + '/backend/public/images/vouchers/' + voucherFound.image;
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            productFound.map((product) => {
                product.voucher = null;
                product.save();
            })
            voucherFound.deleteOne();
            await sess.commitTransaction();
        } catch (err) {
            return res.status(404).json({ err: "Không thể xóa. Đã có lỗi xảy ra." })
        }
        fs.unlink(imgLink, (err) => {
            if (err) { console.log(err) }
        })
        res.status(200).json({ msg: "Đã xóa." })
    } else {
        const currentPath = process.cwd();
        const imgLink = currentPath + '/backend/public/images/vouchers/' + voucherFound.image;
        try {
            voucherFound.deleteOne();
        } catch (err) {
            return res.status(404).json({ err: "Không thể xóa. Đã có lỗi xảy ra." })
        }
        fs.unlink(imgLink, (err) => {
            if (err) { console.log(err) }
        })
        res.status(200).json({ msg: "Đã xóa." })
    }
}

module.exports = {
    createVoucher,
    addProductToVoucher,
    getAllVoucher,
    getVoucherById,
    getVoucherByName,
    getProductByVoucherId,
    removeProductFromVoucher,
    updateVoucher,
    deleteVoucher,
    getProductForVoucher,
    getProductOfVoucher
};