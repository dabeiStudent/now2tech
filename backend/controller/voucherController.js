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
    const now = new Date();
    const voucherFound = await Voucher.findOne({
        name: voucherName,
        end: {
            $gt: now
        }
    })
    if (voucherFound) {
        res.status(200).json(voucherFound);
    }
    else {
        res.status(200).json(null);
    }
}

const createVoucher = async (req, res) => {
    const { name, desc, percent, startDate, endDate } = req.body;
    const image = req.file.path;

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
    const now = new Date();
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
            if (voucherFound.end > now) {
                updateProduct.voucher = voucherFound.name;
                updateProduct.save();
            } else {
                return res.status(401).json({ err: "Hết hạn" });
            }
        } catch (err) {
            return res.status(500).json({ err: err.message });
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

const removeAllProductFromVoucher = async (req, res) => {
    const voucherId = req.params.vid;
    const voucherFound = await Voucher.findOne({ _id: voucherId });
    if (!voucherFound) {
        return res.status(404).json({ err: "Không thấy voucher" });
    }
    const productsFound = await Product.find({ voucher: voucherFound.name })
    if (!productsFound) {
        return res.status(404).json({ err: "Không thấy sản phẩm" });
    }
    productsFound.map((product) => {
        product.voucher = null;
        product.save();
    });
    return res.status(200).json({ msg: "Đã xóa" });
}
const checkAndRemoveExpired = async (req, res) => {
    // console.log(req.body.vouchers);
    const vouchers = req.body.vouchers;
    const now = new Date();
    for (const voucher of vouchers) {
        const voucherEndDate = new Date(voucher.end);
        if (voucherEndDate < now) {
            // console.log(voucher.end)
            const productUpdates = await Product.find({ voucher: voucher.name });
            if (productUpdates) {
                for (const product of productUpdates) {
                    // console.log(product)
                    product.voucher = null;
                    await product.save();
                }
            }
        }
    }
    return res.status(200).json({ msg: "Đã reset" });
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
        // const currentPath = process.cwd();
        // const imgLink = currentPath + '/backend/public/images/vouchers/' + voucherFound.image;
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
        // fs.unlink(imgLink, (err) => {
        //     if (err) { console.log(err) }
        // })
        res.status(200).json({ msg: "Đã xóa." })
    } else {
        // const currentPath = process.cwd();
        // const imgLink = currentPath + '/backend/public/images/vouchers/' + voucherFound.image;
        try {
            voucherFound.deleteOne();
        } catch (err) {
            return res.status(404).json({ err: "Không thể xóa. Đã có lỗi xảy ra." })
        }
        // fs.unlink(imgLink, (err) => {
        //     if (err) { console.log(err) }
        // })
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
    removeAllProductFromVoucher,
    checkAndRemoveExpired,
    updateVoucher,
    deleteVoucher,
    getProductForVoucher,
    getProductOfVoucher
};