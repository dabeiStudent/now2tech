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
const addImagesProduct = async (req, res) => {
    try {
        const files = req.files;
        const productFound = await Product.findById(req.params.pid);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            productFound.pimage.push(file.filename);
        }
        productFound.save();
        return res.status(200).json({ msg: "Upload thành công" });
    } catch (err) {
        return res.status(400).json({ err: "Có lỗi xảy ra" });
    }
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
//add review
const addReview = async (req, res) => {
    const productId = req.params.pid;

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ err: "Không tìm thấy sản phẩm." });
    }

    const existReview = product.reviews.find(review => review.user.toString() === req.data.uid.toString());

    if (existReview) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.data.uid.toString()) {
                review.rating = req.body.rating;
                review.comment = req.body.comment;
            }
        });

    } else {
        product.reviews.push({
            user: req.data.uid,
            userName: req.data.userName,
            comment: req.body.comment,
            rating: req.body.rating
        })

        product.numOfReview = product.reviews.length;
    }

    product.avgRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    try {
        await product.save();
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra. Không thể thêm." });
    }

    res.status(200).json({ msg: "Thêm review thành công." });
}
module.exports = {
    getProduct,
    getProductAdmin,
    getOneProduct,
    addNewProduct,
    addImagesProduct,
    addSpecs4Product,
    updateProduct,
    updateSpecs,
    removeProduct,
    addReview
};