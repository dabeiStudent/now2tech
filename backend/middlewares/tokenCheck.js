const jwt = require('jsonwebtoken');



const checkJWT = (req, res, next) => {
    let token = req.cookies.utoken;
    if (token) {
        req.user = token;
        next();
    } else {
        return res.status(403).json({ err: 'Không thể thực hiện' });
    }
};

module.exports = { checkJWT }