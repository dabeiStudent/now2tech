const User = require('../models/usersModel');
const argon2 = require('argon2');

//register
const userRegister = async (req, res) => {
    const findUser = await User.findOne({ userName: req.body.userName });
    if (findUser) {
        return res.status(400).json({ err: "Username already exists" });
    } else {
        try {
            const hashedPassword = await argon2.hash(req.body.passWord);
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                dob: req.body.dob,
                userName: req.body.userName,
                email: req.body.email,
                passWord: hashedPassword,
                phoneNumber: req.body.phoneNumber,
                role: req.body.role,
                image: req.body.image,
                status: req.body.status
            })
                .then(user => { return res.status(200).json({ msg: 'Created successfully' }) })
                .catch(err => { return res.status(403).json({ err: "Email is already used" }) });
        } catch (err) {
            return res.status(500).json({ err: err });
        }
    }
};

module.exports = { userRegister };