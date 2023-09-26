require('dotenv').config();
const User = require('../models/usersModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

//get all user
const getAllUser = function (req, res) {
    User.find()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(404).json({ err: "Không có user" });
        })
}
//get one user
const getUser = function (req, res) {
    User.findById(req.params.uid)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            return res.status(404).json({ err: "Không tìm thấy" });
        })
}
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
                if (findUser.status !== "active") {
                    return res.status(400).json({ err: "Tài khoản bị khóa" });
                }
                const token = jwt.sign({
                    uid: findUser._id,
                    userName: findUser.userName,
                    email: findUser.email,
                    role: findUser.role,
                    image: findUser.image
                }, process.env.JWT_KEY);
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
//update user
const updateUser = function (req, res) {
    User.findByIdAndUpdate(req.params.uid, req.body)
        .then(result => {
            return res.status(200).json({ msg: "Cập nhật thông tin thành công" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
//change password for user only
const changePassword = async (req, res) => {
    console.log(req.body);
    try {
        const findUser = await User.findById(req.data.uid);
        if (findUser) {
            const valid = await argon2.verify(findUser.passWord, req.body.oldPassword);
            if (valid) {
                const hashNewPass = await argon2.hash(req.body.newPassword);
                console.log(hashNewPass);
                User.updateOne(findUser, {
                    passWord: hashNewPass
                })
                    .then(result => {
                        return res.status(200).json({ msg: "Đã cập nhật mật khẩu" });
                    })
                    .catch(err => {
                        return res.status(400).json({ err: "Có lỗi xảy ra" });
                    })
            } else {
                return res.status(400).json({ err: "Mật khẩu cũ không khớp" });
            }
        } else {
            return res.status(400).json({ err: "Không tìm thấy tài khoản" });
        }
    } catch (err) {
        return res.status(500).json({ err: err });
    }
}
//freeze account
const freezeUser = (req, res) => {
    User.findByIdAndUpdate(req.params.uid, {
        status: "blocked"
    })
        .then(result => {
            return res.status(200).json({ msg: "Đã khóa" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
//free account
const freeUser = (req, res) => {
    User.findByIdAndUpdate(req.params.uid, {
        status: "active"
    })
        .then(result => {
            return res.status(200).json({ msg: "Đã mở khóa" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
//remove account
const removeUser = (req, res) => {
    User.findByIdAndRemove(req.params.uid)
        .then(result => {
            return res.status(200).json({ msg: "Đã xóa tài khoản" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
module.exports = { getAllUser, getUser, userLogin, userRegister, updateUser, changePassword, freezeUser, freeUser, removeUser };