const Product = require('../models/productsModel');
//get all
const getAllProduct = (req, res) => {
    Product.find({
        "ptype.productName": "DemoSP3"
    })
        .then(product => { return res.status(200).json(product) })
        .catch(err => { return res.status(404).json({ err: "Không có sản phẩm" }) });
}
//get one
const getOneProduct = (req, res) => {
    Product.findById(req.params.pid)
        .then(product => { return res.status(200).json(product) })
        .catch(err => { return res.status(404).json({ err: "Không tìm thấy" }) });
}
//add new product & types of product
const addNewProduct = (req, res) => {
    Product.create(req.body)
        .then(result => { return res.status(200).json({ msg: "Thêm sản phẩm thành công" }) })
        .catch(err => { return res.status(400).json({ err: "Sản phẩm đã tồn tại" }) });
}
const addSpecs4Product = (req, res) => {
    Product.findById(req.params.pid)
        .then(product => {
            product.specs.push(req.body);
            product.save();
        })
        .then(result => {
            return res.status(200).json({ msg: "Đã thêm thông số kỹ thuật" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}

//update product
const updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.pid, req.body)
        .then(result => {
            return res.status(200).json({ msg: "Cập nhật thành công" })
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
const updateSpecs = (req, res) => {
    Product.findById(req.params.pid)
        .then(product => {
            product.specs.pop();
            product.specs.push(req.body)
            product.save();
        })
        .then(result => {
            return res.status(200).json({ msg: "Đã cập nhật thông số kỹ thuật" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
//remove product
const removeProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.pid)
        .then(result => {
            return res.status(200).json({ msg: "Xoá sản phẩm thành công" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
module.exports = { getAllProduct, getOneProduct, addNewProduct, addSpecs4Product, updateProduct, updateSpecs, removeProduct };