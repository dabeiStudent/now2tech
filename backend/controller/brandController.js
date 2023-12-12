const Brand = require('../models/brandModel');

const getBrand = (req, res) => {
    Brand.find()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
const getBrandByCate = (req, res) => {
    Brand.find({
        category: req.params.cname
    })
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
const addBrand = async (req, res) => {
    const { name, category } = req.body;
    Brand.findOne({ name, category })
        .then(existingBrand => {
            if (existingBrand) {
                // Nếu đã tồn tại đối tượng, trả về lỗi
                return res.status(409).json({ err: "Đã tồn tại thương hiệu này trong danh mục" });
            } else {
                Brand.create(req.body)
                    .then(result => {
                        return res.status(200).json({ msg: "Success" });
                    })
                    .catch(err => {
                        return res.status(400).json({ err: err });
                    })
            }
        })
        .catch(err => {
            return res.status(400).json({ err: err })
        })
}

const deleteBrand = (req, res) => {
    Brand.findByIdAndDelete(req.params.bid)
        .then(result => {
            return res.status(200).json({ msg: "Success" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}

module.exports = {
    getBrand,
    getBrandByCate,
    addBrand,
    deleteBrand
}