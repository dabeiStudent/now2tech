require('dotenv').config();
const User = require('../models/usersModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Stats = require('../models/userStatsModel');
const cloudinary= require('cloudinary');

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
//get my profile (user signed in)
const getProfile = (req, res) => {
    User.findById(req.data.uid)
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
                }, process.env.JWT_KEY, { expiresIn: 604800 }); //7days: 604800 6h: 43200
                res.cookie("utoken", token, {
                    httpOnly: true, maxAge: 604800000 //7days: 604800000 6h: 43200000
                });
                res.cookie("username", findUser.userName, {
                    maxAge: 604800000
                });
                res.cookie("role", findUser.role, {
                    maxAge: 604800000
                });
                return res.status(200).json({ msg: "Đăng nhập thành công", user: { uid: findUser._id, userName: findUser.userName, role: findUser.role } });
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
const afterLogin = async (req, res) => {
    const token = req.cookies.utoken;
    if (!token) {
        return res.status(401).json({ message: 'Không tìm thấy token' });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token không hợp lệ' });
        }
        res.json({ userName: user.userName, role: user.role });
    })
}
const authUser = async (req, res) => {
    if (req.admin) {
        const { userName, role } = req.admin;
        return res.status(200).json({ msg: "Đây là admin", name: userName, role: role });
    } else if (req.user) {
        const { userName, role } = req.user;
        return res.status(200).json({ msg: "Đây là khách hàng", name: userName, role: role });
    } else {
        const { userName, role } = req.guest;
        return res.status(200).json({ msg: "Chưa đăng nhập", name: userName, role: role });
    }
}
//logout
const userLogout = (req, res) => {
    res.clearCookie("utoken");
    res.clearCookie("username");
    res.clearCookie("role");
    return res.status(200).json({ msg: 'Good bye!' });
}
//register
const statsUser = async () => {
    const currentDate = new Date;
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let existStats;

    try {
        existStats = await Stats.findOne({ year: currentYear });
    } catch (error) {
        return error;
    }

    if (!existStats || existStats.length === 0) {
        let newStats;
        newStats = new Stats({
            year: currentYear,
            monthlyStats: [
                { month: 1 },
                { month: 2 },
                { month: 3 },
                { month: 4 },
                { month: 5 },
                { month: 6 },
                { month: 7 },
                { month: 8 },
                { month: 9 },
                { month: 10 },
                { month: 11 },
                { month: 12 },
            ]
        });

        try {
            newStats.monthlyStats[currentMonth].userNum += 1;
            await newStats.save();
        } catch (error) {
            return error;
        }
    } else {

        existStats.monthlyStats.map(monthStats => {
            if (monthStats.month === currentMonth + 1) {
                monthStats.userNum += 1;
            }
        });

        try {
            await existStats.save();
        } catch (error) {
            return error;
        }
    }
};
const userRegister = async (req, res) => {
    if (req.body.userName == "admin") {
        return res.status(400).json({ err: "Không thể đặt tên này" });
    }
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
            status: "active",
            getNotice: true
        })
            .then(user => {
                statsUser();
                return res.status(200).json({ msg: 'Tạo tài khoản thành công' })
            })
            .catch(err => { return res.status(403).json({ err: err }) });
    } catch (err) {
        return res.json({ err: err })
    }
};
//update user
const updateUser = function (req, res) {
    if (req.body.userName == "admin") {
        return res.status(400).json({ msg: "Không thể dùng username này" })
    }
    User.findByIdAndUpdate(req.params.uid, req.body)
        .then(result => {
            return res.status(200).json({ msg: "Cập nhật thông tin thành công" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
//update profile (user signed in)
const updateProfile = function (req, res) {
    // console.log(req.body)
    if (req.body.userName == "admin") {
        return res.status(400).json({ err: "Không thể dùng username này" })
    }
    User.findByIdAndUpdate(req.data.uid, req.body)
        .then(result => {
            return res.status(200).json({ msg: "Cập nhật thông tin thành công" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
//upload image 
const uploadProfileImage = async (req, res) => {
    
    User.findByIdAndUpdate(req.data.uid, { image: req.file.path })
        .then(result => { return res.status(200).json({ msg: "Upload thành công" }) })
        .catch(err => { return res.status(400).json({ err: "Có lỗi xảy ra" }) });
};
//change password for user only
const changePassword = async (req, res) => {
    try {
        const findUser = await User.findById(req.data.uid);
        if (findUser) {
            const valid = await argon2.verify(findUser.passWord, req.body.oldPassword);
            if (valid) {
                const hashNewPass = await argon2.hash(req.body.newPassword);
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
            return res.status(404).json({ err: "Không tìm thấy tài khoản" });
        }
    } catch (err) {
        return res.status(500).json({ err: err });
    }
}
//set user status (1= blocked, 0= active)
const setStatus = (req, res) => {
    if (req.params.status == 1) {
        User.findByIdAndUpdate(req.params.uid, {
            status: "blocked"
        })
            .then(result => {
                return res.status(200).json({ msg: "Đã khóa" });
            })
            .catch(err => {
                return res.status(400).json({ err: err });
            })
    } else if (req.params.status == 0) {
        User.findByIdAndUpdate(req.params.uid, {
            status: "active"
        })
            .then(result => {
                return res.status(200).json({ msg: "Đã mở khóa" });
            })
            .catch(err => {
                return res.status(400).json({ err: err });
            })
    } else {
        return res.status(400).json({ err: "Có lỗi xảy ra" });
    }
}
//remove account
const removeUser = async (req, res) => {
    const isAdmin = await User.findById(req.params.uid);
    if (isAdmin.userName === "admin") {
        return res.status(400).json({ err: "Admin" });
    }
    User.findByIdAndRemove(req.params.uid)
        .then(result => {
            return res.status(200).json({ msg: "Đã xóa tài khoản" });
        })
        .catch(err => {
            return res.status(400).json({ err: err });
        })
}
module.exports = { getAllUser, getUser, getProfile, userLogin, authUser, userLogout, userRegister, updateUser, updateProfile, uploadProfileImage, changePassword, setStatus, removeUser };