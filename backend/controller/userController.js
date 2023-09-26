const User = require('../models/usersModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
//login
const userLogin = async (req, res) => {
    if (!req.body.email || !req.body.passWord) {
        return res.status(404).json({ err: "Email/Mật khẩu không đúng" });
    }
    try {
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            const validPassword = await argon2.verify(findUser.passWord, req.body.passWord);
            if (validPassword) {
                const token = jwt.sign({
                    userName: findUser.userName,
                    email: findUser.email,
                    role: findUser.role,
                    image: findUser.image
                }, '123');
                res.cookie("utoken", token, {
                    httpOnly: true
                });
                return res.status(200).json({ msg: "Đăng nhập thành công", userName: findUser.userName, role: findUser.role });
            } else {
                return res.status(404).json({ err: "Email/Mật khẩu không đúng" })
            }
        } else {
            return res.status(404).json({ err: "Email/Mật khẩu không đúng" })
        }
    } catch (err) {
        return res.status(500).json({ err: err });
    }
}
//register
const userRegister = async (req, res) => {
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
            role: "user",
            image: req.body.image,
            status: "active"
        })
            .then(user => { return res.status(200).json({ msg: 'Tạo tài khoản thành công' }) })
            .catch(err => { return res.status(403).json({ err: "Email đã được sử dụng" }) });
    } catch (err) {
        return res.status(500).json({ err: err });
    }
};


module.exports = { userLogin, userRegister };