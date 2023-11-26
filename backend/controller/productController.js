const { json } = require('body-parser');
const Product = require('../models/productsModel');

//get all & filter by brand, price, category.
//mỗi hàm filter chỉ truyền tham số req.query phù hợp
//nếu không truyền req.query mặc định xử lý tìm kiếm tất cả sản phẩm 
//với keyword từ người dùng
//tất cả hàm tìm đều xử lý pagination (10sp/trang)
const getProduct = async (req, res) => {
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
    try {
        if (category) {
            if (brand != "All") {
                if (max == 0) {
                    const productFound = await Product.find({
                        category: category,
                        brand: brand
                    });
                    const returnStart = (pageLimit * (pageNumber - 1));
                    const returnEnd = returnStart + pageLimit;
                    return res.status(200).json({
                        result: productFound.slice(returnStart, returnEnd),
                        maxLength: productFound.length
                    });
                    // Product.find({
                    //     category: category,
                    //     brand: brand
                    // })
                    //     .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
                    //     .then(product => { return res.status(200).json(product) })
                    //     .catch(err => { return res.status(404).json({ err: "Không có sản phẩm" }) });
                } else {
                    const productFound = await Product.find({
                        category: category,
                        brand: brand,
                        sellPrice: { $gte: min, $lte: max }
                    });
                    const returnStart = (pageLimit * (pageNumber - 1));
                    const returnEnd = returnStart + pageLimit;
                    return res.status(200).json({
                        result: productFound.slice(returnStart, returnEnd),
                        maxLength: productFound.length
                    });
                    // Product.find({
                    //     category: category,
                    //     brand: brand,
                    //     sellPrice: { $gte: min, $lte: max }
                    // })
                    //     .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
                    //     .then(product => { return res.status(200).json(product) })
                    //     .catch(err => {
                    //         return res.status(404).json({ err: "Không có sản phẩm" })
                    //     });
                }
            } else if (brand === "All") {
                if (max == 0) {
                    const productFound = await Product.find({
                        category: category,
                    });
                    const returnStart = (pageLimit * (pageNumber - 1));
                    const returnEnd = returnStart + pageLimit;
                    return res.status(200).json({
                        result: productFound.slice(returnStart, returnEnd),
                        maxLength: productFound.length
                    });
                    // Product.find({
                    //     category: category
                    // })
                    //     .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
                    //     .then(product => { return res.status(200).json(product) })
                    //     .catch(err => {
                    //         return res.status(404).json({ err: "Không có sản phẩm" })
                    //     });
                } else {
                    const productFound = await Product.find({
                        category: category,
                        sellPrice: { $gte: min, $lte: max }
                    });
                    const returnStart = (pageLimit * (pageNumber - 1));
                    const returnEnd = returnStart + pageLimit;
                    return res.status(200).json({
                        result: productFound.slice(returnStart, returnEnd),
                        maxLength: productFound.length
                    });
                    // Product.find({
                    //     category: category,
                    //     sellPrice: { $gte: min, $lte: max }
                    // })
                    //     .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
                    //     .then(product => { return res.status(200).json(product) })
                    //     .catch(err => {
                    //         return res.status(404).json({ err: "Không có sản phẩm" })
                    //     });
                }
            }
            else {
                const productFound = await Product.find({
                    category: category,
                });
                const returnStart = (pageLimit * (pageNumber - 1));
                const returnEnd = returnStart + pageLimit;
                return res.status(200).json({
                    result: productFound.slice(returnStart, returnEnd),
                    maxLength: productFound.length
                });
                // Product.find({
                //     category: category
                // })
                //     .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
                //     .then(product => { return res.status(200).json(product) })
                //     .catch(err => { return res.status(404).json({ err: "Không có sản phẩm" }) });
            }
        } else {
            const productFound = await Product.find({
                ...keyWord
            });
            const returnStart = (pageLimit * (pageNumber - 1));
            const returnEnd = returnStart + pageLimit;
            return res.status(200).json({
                result: productFound.slice(returnStart, returnEnd),
                maxLength: productFound.length
            });
            // Product.find({ ...keyWord })
            //     .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
            //     .then(product => { return res.status(200).json(product) })
            //     .catch(err => { return res.status(404).json({ err: "Không có sản phẩm" }) });
        }
    } catch (err) {
        return res.status(500).json({ err: err });
    }
}
const getGoodProduct = async (req, res) => {
    const pageLimit = process.env.Pagination_limit;
    const pageNumber = Number(req.query.page) || 1;
    try {
        const productFound = await Product.find({
            avgRating: {
                $gte: 4,
                $lte: 5
            }
        }).sort({
            avgRating: -1
        });
        const returnStart = (pageLimit * (pageNumber - 1));
        const returnEnd = returnStart + pageLimit;
        return res.status(200).json({
            result: productFound.slice(returnStart, returnEnd),
            maxLength: productFound.length
        });
    } catch (err) {
        return res.status(500).json({ err: err });
    }
    // Product.find({
    //     avgRating: {
    //         $gte: 3,
    //         $lte: 5
    //     }
    // })
    //     .limit(pageLimit).skip(pageLimit * (pageNumber - 1))
    //     .then(product => { return res.status(200).json(product) })
    //     .catch(err => { return res.status(404).json({ err: "Không có sản phẩm" }) });
}
const getMaxSelling = async (req, res) => {
    const pageLimit = process.env.Pagination_limit;
    const pageNumber = Number(req.query.page) || 1;
    try {
        const productFound = await Product.find({
            avgRating: { $gte: 3 }
        }).sort({
            sold: -1
        })
        const returnStart = (pageLimit * (pageNumber - 1));
        const returnEnd = returnStart + pageLimit;
        return res.status(200).json({
            result: productFound.slice(returnStart, returnEnd),
            maxLength: productFound.length
        });
    } catch (err) {
        return res.status(500).json({ err: err });
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
    getGoodProduct,
    getMaxSelling,
    addNewProduct,
    addImagesProduct,
    addSpecs4Product,
    updateProduct,
    updateSpecs,
    removeProduct,
    addReview
};