import axios from "axios";
import React, { useEffect, useState } from "react";

import './ProfileMenu.css';
const ProfileMenu = () => {
    const [profileState, setProfileState] = useState(0);
    const [noti, setNoti] = useState();
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
    const [updateUser, setUpdateUser] = useState({})
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
                setUpdateUser({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    phoneNumber: res.data.phoneNumber,
                    userName: res.data.userName,
                    gender: res.data.gender,
                    getNotice: res.data.getNotice,
                    image: res.data.image,
                    dob: res.data.dob
                })
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
    const updateProfileHandler = event => {
        event.preventDefault();
        axios.put('http://localhost:5000/user/profile/update', updateUser, { withCredentials: true })
            .then(res => {
                window.location.href = "/my-profile"
            })
            .catch(err => {
                if (err.message === "Request failed with status code 400") {
                    setNoti("Không thể đặt username này");
                }
            });
    }
    return (
        <React.Fragment>
            <h2>Thông tin tài khoản</h2>
            {profileState === 0
                ? <div className="my_profile">
                    <div className="left_profile">
                        <img src="https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg" alt="Hình đại diện" />
                    </div>
                    <div className="mid_profile">
                        <p>Tên: {user.firstName}</p>
                        <p>Họ: {user.lastName}</p>
                        <p>Số điện thoại: {user.phoneNumber}</p>
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
                            <p>{noti}</p>
                            <form onSubmit={updateProfileHandler}>
                                <div className="my_profile">
                                    <div className="left_profile">
                                        <img src="https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg" alt="Hình đại diện" />
                                    </div>
                                    <div className="mid_profile">
                                        <input name='firstName' value={updateUser.firstName} onChange={onChange} placeholder="Tên" required />
                                        <input name='lastName' value={updateUser.lastName} onChange={onChange} placeholder="Họ" required />
                                        <input name='phoneNumber' value={updateUser.phoneNumber} onChange={onChange} placeholder="Số điện thoại" required />
                                        <input name='dob' value={updateUser.dob} onChange={onChange} placeholder="Ngày sinh" required />
                                    </div>
                                    <div className="right_profile">
                                        <input name='email' value={updateUser.email} onChange={onChange} placeholder="Email" disabled />
                                        <input name='userName' value={updateUser.userName} onChange={onChange} placeholder="Username" required />
                                        <input name='gender' value={updateUser.gender} onChange={onChange} placeholder="Giới tính (Male/Female)" required />
                                        <input name='getNotice' value={updateUser.getNotice} onChange={onChange} placeholder="Thông báo (false/true)" required />
                                    </div>
                                </div>
                                <div className="buttons-1">
                                    <input type="submit" className="custom-button-1" value="Cập nhật" />
                                    <button className="custom-button-1" onClick={changeToProfile}>Quay lại</button>
                                </div>
                            </form>
                        </div>
                        : <div className="update_password">
                            <p onClick={changeToProfile}>X</p>
                            Update Password
                        </div>}
            {
                profileState === 0
                    ? <div className="container">
                        <div className="buttons">
                            <button className="custom-button" onClick={changeToUpdateImage}>Cập nhật ảnh đại diện</button>
                            <button className="custom-button" onClick={changeToUpdateProfile}>Cập nhật thông tin</button>
                            <button className="custom-button" onClick={changeToUpdatePassword}>Đổi mật khẩu</button>
                        </div>
                    </div>
                    : <div></div>
            }

        </React.Fragment >
    )
}

export default ProfileMenu;