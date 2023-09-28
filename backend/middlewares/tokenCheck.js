const jwt = require('jsonwebtoken');
require('dotenv').config();


const checkJWT = (req, res, next) => {
    let token = req.cookies.utoken;
    if (token) {
        req.user = token;
        next();
    } else {
        return res.status(403).json({ err: 'Không thể thực hiện' });
    }
};
const isAdmin = (req, res, next) => {
    let data = jwt.verify(req.user, process.env.JWT_KEY);
    if (data.role == "admin") {
        req.admin = data;
        next();
    } else {
        return res.status(403).json({ err: "Không phải admin" });
    }
}

module.exports = { checkJWT, isAdmin }