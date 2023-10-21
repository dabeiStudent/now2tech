const Product = require('../models/productsModel');

//get all & filter by brand, price, category.
//mỗi hàm filter chỉ truyền tham số req.query phù hợp
//nếu không truyền req.query mặc định xử lý tìm kiếm tất cả sản phẩm 
//với keyword từ người dùng
//tất cả hàm tìm đều xử lý pagination
const getProduct = (req, res) => {
    const pageLimit = process.env.Pagination_limit;
    const pageNumber = Number(req.query.page) || 1;
    const { brand, category } = req.query;
    const { min, max } = req.query;
    const keyWord = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};
    if (brand) {
        // console.log(brand)
        Product.find({ brand })
            .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(404).json({ err: err });
            })
    } else if (category) {
        // console.log(category)
        Product.find({ category })
            .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(404).json({ err: err });
            })
    } else if (min && max) {
        // console.log(min, max)
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
    } else {
        Product.find({ ...keyWord })
            .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
            .then(product => { return res.status(200).json(product) })
            .catch(err => { return res.status(404).json({ err: "Không có sản phẩm" }) });
    }
}
const getProductAdmin = (req, res) => {
    Product.find()
        .then(result => { return res.status(200).json(result) })
        .catch(err => { return res.status(400).json({ err: err }) });
}
//get one
const getOneProduct = async (req, res) => {
    Product.findById(req.params.pid)
        .populate('vouchers')
        .then(product => { return res.status(200).json(product) })
        .catch(err => { return res.status(404).json({ err: "Không tìm thấy" }) });
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
    const { specs } = req.body;
    Product.findById(req.params.pid)
        .then((product) => {
            if (product.specs.length === 0) {
                specs.map(spec => {
                    product.specs.push(spec);
                })
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
module.exports = { getProduct, getProductAdmin, getOneProduct, addNewProduct, addSpecs4Product, updateProduct, updateSpecs, removeProduct };