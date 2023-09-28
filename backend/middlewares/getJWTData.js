const jwt = require('jsonwebtoken');
require('dotenv').config();

const getData = (req, res, next) => {
    let data = jwt.verify(req.user, process.env.JWT_KEY);
    if (data) {
        req.data = data;
        next();
    } else {
        return res.status(400).json({ err: "Có lỗi" });
    }
}

module.exports = { getData }