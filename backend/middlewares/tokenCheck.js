const jwt = require('jsonwebtoken');

const checkJWT = (req, res, next) => {
    let cookies = req.cookies;
    if (cookies.utoken) {
        next();
    } else {
        return res.status(403).json({ err: 'Không thể thực hiện' });
    }
};

module.exports = { checkJWT }