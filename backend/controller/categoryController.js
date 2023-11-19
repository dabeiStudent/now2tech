const mongoose = require('mongoose');

const Category = require('../models/categoryModel');
const newCategory = async (req, res) => {
    Category.create(req.body)
        .then(result => {
            return res.status(200).json({ msg: "Thành công" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}

const getCategory = async (req, res) => {
    Category.find()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}

const deleteCategory = async (req, res) => {
    Category.findByIdAndDelete(req.params.cid)
        .then(result => {
            return res.status(200).json({ msg: "Đã xóa" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}

module.exports = {
    newCategory,
    getCategory,
    deleteCategory
}