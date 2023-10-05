import axios from "axios";
import React, { useEffect, useState } from "react";

import './ProfileMenu.css';
const ProfileMenu = () => {
    const userLoggedIn = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userName: '',
        gender: '',
        getNotice: '',
        image: '',
        dob: ''
    })
    useEffect(() => {
        axios.get('http://localhost:5000/user/profile/my-profile', { withCredentials: true })
            .then(res => {
                setUser({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    phoneNumber: res.data.phoneNumber,
                    userName: res.data.userName,
                    gender: res.data.gender,
                    getNotice: res.data.getNotice,
                    image: res.data.image,
                    dob: res.data.dob
                });
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [userLoggedIn.userName]);
    return (
        <React.Fragment>
            <h2>Thông tin tài khoản</h2>
            <div className="my_profile">
                <div className="left_profile">
                    <img src="https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg" />
                </div>
                <div className="mid_profile">
                    <p>Tên: {user.firstName}</p>
                    <p>Họ: {user.lastName}</p>
                    <p>Số điện thoại: {user.firstName}</p>
                    <p>Ngày sinh: {user.dob}</p>
                </div>
                <div className="right_profile">
                    <p>Email: {user.email}</p>
                    <p>Username: {user.userName}</p>
                    <p>Giới tính: {user.gender}</p>
                    <p>Nhận thông báo: {user.getNotice === 0 ? "Không" : "Có"}</p>

                </div>
            </div>
            <div className="buttons">
                <button>Cập nhật ảnh đại diện</button>
                <button>Cập nhật thông tin</button>
                <button>Đổi mật khẩu</button>
            </div>
        </React.Fragment>
    )
}

export default ProfileMenu;