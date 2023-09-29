const Product = require('../models/productsModel');
//get all & fulltext search
const getAllProduct = (req, res) => {
    const pageLimit = process.env.Pagination_limit;
    const pageNumber = Number(req.query.page) || 1;
    const keyWord = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};
    Product.find({ ...keyWord })
        .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
        .then(product => { return res.status(200).json(product) })
        .catch(err => { return res.status(404).json({ err: "Không có sản phẩm" }) });
}
//get one
const getOneProduct = (req, res) => {
    Product.findById(req.params.pid)
        .then(product => { return res.status(200).json(product) })
        .catch(err => { return res.status(404).json({ err: "Không tìm thấy" }) });
}
//get product by: brand, category, price
const getProductByBrandCate = (req, res) => {
    const pageLimit = process.env.Pagination_limit;
    const pageNumber = Number(req.query.page) || 1;
    const { brand, category } = req.query;
    if (brand) {
        Product.find({ brand })
            .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(404).json({ err: err });
            })
    } else if (category) {
        Product.find({ category })
            .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(404).json({ err: err });
            })
    } else {
        return res.status(404).json({ err: "Không có sản phẩm phù hợp" });
    }
}
const getProductByPrice = (req, res) => {
    const pageLimit = process.env.Pagination_limit;
    const pageNumber = Number(req.query.page) || 1;
    const { min, max } = req.query;
    Product.find({
        sellPrice: { $gte: min, $lte: max }
    })
        .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(404).json({ err: err });
        })
}
//add new product & types of product
const addNewProduct = (req, res) => {
    Product.create(req.body)
        .then(result => {
            return res.status(200).json({ msg: "Thêm sản phẩm thành công" })
        })
        .catch(err => { return res.status(400).json({ err: "Sản phẩm đã tồn tại" }) });
}
const addSpecs4Product = (req, res) => {
    Product.findById(req.params.pid)
        .then((product) => {
            if (product.specs.length === 0) {
                product.specs.push(req.body);
                product.save();
                return res.status(200).json({ msg: "Thêm thành công" })
            } else {
                return res.status(400).json({ err: "Không thể thêm, đã có thông số kỹ thuật" });
            }
        }, (err) => {
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
        .then((product) => {
            product.specs.shift();
            product.specs.push(req.body)
            product.save();
            return res.status(200).json({ msg: "Đã cập nhật thông số kỹ thuật" });
        }, (err) => {
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
module.exports = { getAllProduct, getOneProduct, getProductByBrandCate, getProductByPrice, addNewProduct, addSpecs4Product, updateProduct, updateSpecs, removeProduct };