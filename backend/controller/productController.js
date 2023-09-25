const Product = require('../models/productsModel');
const Product_type = require('../models/product_typeModel');
//get all
const getAllProduct = (req, res) => {
    Product.find()
        .then(product => { return res.status(200).json(product) })
        .catch(err => { return res.status(404).json({ err: "Nothing here" }) })
};
//get one
//add new product & types of product
const addNewProduct = (req, res) => {
    try {
        Product.create({
            name: req.body.name,
            desc: req.body.desc,
            pimage: req.body.pimage,
            tags: req.body.tags,
            release: req.body.release,
            made: req.body.made,
            category: req.body.category,
            brand: req.body.brand,
            inStock: req.body.inStock,
            ptype: {
                productName: req.body.name,
                SKU: req.body.SKU,
                typeName: req.body.typeName,
                importPrice: req.body.importPrice,
                sellPrice: req.body.sellPrice,
                quantity: req.body.quantity,
                sold: req.body.sold,
                image: req.body.image,
                voucher: req.body.voucher,
                test: req.body.test
            }
        })
            .then(
                Product_type.create({
                    productName: req.body.name,
                    SKU: req.body.SKU,
                    typeName: req.body.typeName,
                    importPrice: req.body.importPrice,
                    sellPrice: req.body.sellPrice,
                    quantity: req.body.quantity,
                    sold: req.body.sold,
                    image: req.body.image,
                    voucher: req.body.voucher
                })
                    .then(product => {
                        return res.status(200).json({ msg: 'Added successfully' })
                    })
                    .catch(err => { return res.status(401).json({ err: err }) })
            )
            .catch(err => { return res.status(401).json({ err: err }) })
    }
    catch (err) {
        return res.status(401).json({ err: err })
    }
};

const addNewProductType = async (req, res) => {
    try {
        const findSKU = await Product_type.findOne({ SKU: req.body.SKU });
        if (findSKU) {
            return res.status(401).json({ err: "SKU already exist" })
        }
        else {
            Product_type.create({
                productName: req.body.productName,
                SKU: req.body.SKU,
                typeName: req.body.typeName,
                importPrice: req.body.importPrice,
                sellPrice: req.body.sellPrice,
                quantity: req.body.quantity,
                sold: req.body.sold,
                image: req.body.image,
                voucher: req.body.voucher
            })
                .then(
                    Product.findById(req.body.productId)
                        .then((product) => {
                            product.ptype.push({
                                productName: req.body.productName,
                                SKU: req.body.SKU,
                                typeName: req.body.typeName,
                                importPrice: req.body.importPrice,
                                sellPrice: req.body.sellPrice,
                                quantity: req.body.quantity,
                                sold: req.body.sold,
                                image: req.body.image,
                                voucher: req.body.voucher
                            })
                            product.save();
                        })
                        .then(result => {
                            return res.status(200).json({ msg: "Added successfully!" });
                        })
                        .catch(error => {
                            return res.status(401).json({ err: error })
                        })
                )
                .catch(err => {
                    return res.status(401).json(err);
                })
        }
    } catch (err) {
        return res.status(400).json({ err: err });
    }
};
//test git remote

module.exports = { getAllProduct, addNewProduct, addNewProductType };