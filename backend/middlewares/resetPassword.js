const express = require('express');
const nodemailer = require('nodemailer');
const argon2 = require('argon2');
const User = require('../models/usersModel');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tranlan0310@gmail.com', // Thay 'your_email@example.com' bằng địa chỉ email của bạn
        pass: 'tkdh kfmq tsfp tmcf'
    }
});
const generateNewPassword = async () => {
    const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let passWord = "";

    for (let i = 0; i < charSet.length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        passWord += charSet[randomIndex];
    }

    return passWord;
}
const resetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ err: "Không tìm thấy email trong hệ thống" });
        }
        const newPassword = await generateNewPassword();
        const hashPassword = await argon2.hash(newPassword);
        findUser.passWord = hashPassword;
        await findUser.save();

        //Send email to user
        const mailOptions = {
            from: 'tranlan0310@gmail.com',
            to: email,
            subject: 'Mật khẩu mới',
            text: `Mật khẩu mới của bạn là: ${newPassword}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({ err: "Có lỗi xảy ra" });
            } else {
                console.log(`Email gửi thành công, mật khẩu mới là: ${newPassword}`);
                return res.status(200).json({ msg: "Đổi mật khẩu thành công" });
            }
        });
    } catch (err) {
        return res.status(500).json({ err: "Có lỗi xảy ra" });
    }
}


module.exports = { resetPassword };