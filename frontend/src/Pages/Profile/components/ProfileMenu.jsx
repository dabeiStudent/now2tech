import axios from "axios";
import React, { useEffect, useState } from "react";

import './ProfileMenu.css';
import { set } from "mongoose";
const ProfileMenu = () => {
    const [profileState, setProfileState] = useState(0);
    const userData = JSON.parse(localStorage.getItem('user-data'));
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
    const [updateUser, setUpdateUser] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        userName: userData.userName,
        gender: userData.gender,
        getNotice: userData.getNotice,
        image: userData.image,
        dob: userData.dob
    })
    const onChange = event => {
        event.preventDefault();
        setUpdateUser({ ...updateUser, [event.target.name]: event.target.value });
    }
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
                localStorage.setItem('user-data', JSON.stringify(res.data));
            })
            .catch(err => console.log(err))
    }, []);
    const changeToProfile = event => {
        event.preventDefault();
        setProfileState(0);
    }
    const changeToUpdateImage = event => {
        event.preventDefault();
        setProfileState(1);
    }
    const changeToUpdateProfile = event => {
        event.preventDefault();
        setProfileState(2);
    }
    const changeToUpdatePassword = event => {
        event.preventDefault();
        setProfileState(3);
    }
    return (
        <React.Fragment>
            <h2>Thông tin tài khoản</h2>
            {profileState === 0
                ? <div className="my_profile">
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
                        <p>Giới tính: {user.gender === "Male" ? "Nam" : "Nữ"}</p>
                        <p>Nhận thông báo: {user.getNotice === false ? "Không" : "Có"}</p>

                    </div>
                </div>
                : profileState === 1
                    ? <div className="update_image">
                        <p onClick={changeToProfile}>X</p>
                        Update Image
                    </div>
                    : profileState === 2
                        ? <div className="update_profile">
                            <p onClick={changeToProfile}>X</p>
                            <div className="my_profile_update">
                                <div className="left_profile_update">
                                    <input name='firstName' value={updateUser.firstName} onChange={onChange} />
                                    <input name='lastName' value={updateUser.lastName} onChange={onChange} />
                                    <input name='phoneNumber' value={updateUser.phoneNumber} onChange={onChange} />
                                    <input name='dob' value={updateUser.dob} onChange={onChange} />
                                </div>
                                <div className="right_profile_update">
                                    <input name='email' value={updateUser.email} onChange={onChange} />
                                    <input name='userName' value={updateUser.userName} onChange={onChange} />
                                    <input name='gender' value={updateUser.gender} onChange={onChange} />
                                    <input name='getNotice' value={updateUser.getNotice} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                        : <div className="update_password">
                            <p onClick={changeToProfile}>X</p>
                            Update Password
                        </div>}

            <div className="container">
                <div className="buttons">
                    <button className="custom-button" onClick={changeToUpdateImage}>Cập nhật ảnh đại diện</button>
                    <button className="custom-button" onClick={changeToUpdateProfile}>Cập nhật thông tin</button>
                    <button className="custom-button" onClick={changeToUpdatePassword}>Đổi mật khẩu</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfileMenu;