const Product = require('../models/productsModel');

//get all
//get one
//add new product
const addNewProduct = (req, res) => {
    Product.create(req.body)
        .then(product => { return res.status(200).json({ msg: 'Added successfully' }) })
        .catch(err => { return res.status(401).json({ err: 'Something went wrong' }) });
};

module.exports = { addNewProduct };