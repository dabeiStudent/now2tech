require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const argon2 = require('argon2');
const User = require('../models/usersModel');
const RspToken = require('../models/rspTokenModel');
const jwt = require('jsonwebtoken');
const Voucher = require('../models/vouchersModel');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tranlan0310@gmail.com',
        pass: 'tkdh kfmq tsfp tmcf'
    }
});
const generateNewPassword = async () => {
    const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_+|?";
    let passWord = "";

    for (let i = 0; i < charSet.length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        passWord += charSet[randomIndex];
    }

    return passWord;
}

//reset password with email (exist in database) 
const sendEmailReset = async (req, res) => {
    try {
        const localhost = process.env.url_localhost;
        const time = Date.now();
        const findUser = await User.findOne({ email: req.body.email });
        if (!findUser) {
            return res.status(404).json({ err: "Không tìm thấy email trong hệ thống" });
        }
        //secret là key dùng để tạo one time link
        //ở hàm tiếp theo sẽ kiểm tra bằng cách verify lại token với secret
        const secret = process.env.JWT_KEY + findUser.passWord
        const resetToken = jwt.sign({
            email: req.body.email,
        }, secret, { expiresIn: 300 }); //seconds
        RspToken.create({
            rspToken: resetToken,
            createAt: time,
            expireIn: time + 300000 // 300000 miliseconds
        }).catch(err => { return res.json({ err: err }); })
        const mailOptions = {
            from: 'Now2Tech <tranlan0310@gmail.com>',
            to: req.body.email,
            subject: 'Xác thực yêu cầu thiết lập lại mật khẩu',
            html: `<h2 style="color:black;">Bạn đã có yêu cầu thiết lập lại mật khẩu, hãy nhấn vào đường link bên dưới:</h2>
            <p style="color:red;">http://${localhost}/user/reset-password/check-token?rspToken=${resetToken}&time=${time}&email=${req.body.email}</p>
            <p style="color:black;">Để xác thực email này là của bạn</p>
            <p style="color:black;">(Liên kết sẽ bị vô hiệu hóa sau 5 phút)</p>`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(400).json({ err: err });
            } else {
                // console.log(`Nội dung url reset: `);
                // console.log(resetToken);
                // console.log(time);
                console.log(`Email xác thực: http://${localhost}/user/reset-password/check-token?rspToken=${resetToken}&time=${time}&email=${req.body.email}`);
                return res.status(200).json({ msg: "Hãy kiểm tra email" });
            }
        });
    } catch (err) {
        return res.json({ err: err });
    }
}
const resetPassword = async (req, res) => {
    try {
        const { rspToken, time, email } = req.query;
        const findRsToken = await RspToken.findOne({ rspToken: rspToken, createAt: time })
        const now = Date.now();
        const calculateValidTime = now - findRsToken.createAt;
        if (calculateValidTime > 300000) {
            console.log("Token đã hết hạn, liên kết không còn");
            console.log(`${calculateValidTime} ms`);
            return res.json({ err: "Đã hơn 5 phút" });
        }
        if (findRsToken) {
            const findUser = await User.findOne({ email });
            if (!findUser) {
                return res.status(404).json({ err: "Không tìm thấy email trong hệ thống" });
            }
            //secret là key dùng để tạo one time link
            const secret = process.env.JWT_KEY + findUser.passWord;
            //kiểm tra xem JWT_KEY+password còn giống với kết quả khi thực hiện hàm send không 
            //nếu hàm bung lỗi => passWord đã được xử lý đổi lại trước đó nên 2 key để sign và verify rspToken khác nhau
            jwt.verify(findRsToken.rspToken, secret);
            const newPassword = await generateNewPassword();
            const hashPassword = await argon2.hash(newPassword);
            findUser.passWord = hashPassword;
            await findUser.save();

            //Send email to user
            const mailOptions = {
                from: 'Now2Tech <tranlan0310@gmail.com>',
                to: email,
                subject: 'Mật khẩu mới',
                html: `<h3 style="color:black;">Bạn đã có yêu cầu thiết lập lại mật khẩu, mật khẩu mới của bạn là:</h3>
                        <p style="color:red;">${newPassword}</p>
                        <p style="color:black;">Hãy đăng nhập lại và tiến hành thay đổi mật khẩu</p>`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(400).json({ err: err });
                } else {
                    console.log(calculateValidTime)
                    console.log(`Email gửi thành công, mật khẩu mới là: ${newPassword}`);
                    // console.log(`Mật khẩu hash: ${hashPassword}`)
                    return res.status(200).json({ msg: "Đổi mật khẩu thành công, hãy kiểm tra email để nhận mật khẩu mới" });
                }
            });
        } else {
            return res.json({ err: "Không hợp lệ" });
        }
    } catch (err) {
        console.log({ err: err });
        return res.status(500).json({ err: err });
    }
}

//send voucher to email (getNotice: true) in database
const sendVoucherMail = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.body.vid);
        if (!voucher) {
            return res.status(404).json({ err: "Không thấy voucher" });
        } else {
            const percent = voucher.percent;
            const name = voucher.name;
            const users = await User.find({ getNotice: true });
            const userMail = users.map((user) => user.email);
            if (userMail.length < 1) {
                return res.status(404).json({ err: "Không có user nào nhận thông báo khuyến mãi" });
            }
            console.log(userMail);
            const mailOptions = {
                from: 'Now2Tech <tranlan0310@gmail.com>',
                to: userMail,
                subject: 'Thông báo khuyến mãi',
                html: `<h1 style="color:red;">Voucher ${name} đang có khuyến mãi tới ${percent}% </h1>
                    <h2 style="color:black;">Hãy tới ngay Now2Tech để chọn sản phẩm ưng ý nhất</h2>
                    <p2 style="color:black;">Để hủy nhận thông tin khuyến mãi hãy cập nhật ở "Hồ sơ của tôi"</p>`
            }
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(400).json({ err: err });
                } else {
                    console.log(`Email gửi thành công`);
                    return res.status(200).json({ msg: "Đã thông báo tới user email", email: userMail });
                }
            })
        }
    } catch (err) {
        return res.json({ err: err });
    }
}


module.exports = { sendEmailReset, resetPassword, sendVoucherMail };