const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 60000,
    max: 5,
    handler: function (req, res) {
        res.status(429).send({
            status: 500,
            message: 'Too many requests!',
        });
    },
});

module.exports = { apiLimiter };