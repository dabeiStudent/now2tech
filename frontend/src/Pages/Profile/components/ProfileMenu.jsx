import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    });
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: ''
    });
    const [updateUser, setUpdateUser] = useState({})

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
        setNoti('');
        setFile();
        setProfileState(0);
    }
    const changeToUpdateImage = event => {
        event.preventDefault();
        setNoti('');
        setProfileState(1);
    }
    const changeToUpdateProfile = event => {
        event.preventDefault();
        setNoti('');
        setProfileState(2);
    }
    const changeToUpdatePassword = event => {
        event.preventDefault();
        setNoti('');
        setProfileState(3);
    }
    const regex = /^(09|08|03|07|05)[0-9]{8}$/igm;
    const updateProfileHandler = event => {
        event.preventDefault();
        if (regex.test(updateUser.phoneNumber) == false) {
            toast("Số điện thoại không hợp lệ")
        } else {
            axios.put('http://localhost:5000/user/profile/update', updateUser, { withCredentials: true })
                .then(res => {
                    window.location.href = "/my-profile"
                })
                .catch(err => {
                    if (err.message === "Request failed with status code 400") {
                        toast("Không thể đặt username này");
                    }
                });
        }
    }
    const deleteImageHandler = event => {
        event.preventDefault();
        const image = {
            image: "Chưa có"
        }
        axios.put('http://localhost:5000/user/profile/update', image, { withCredentials: true })
            .then(res => {
                window.location.href = "/my-profile"
            })
            .catch(err => {
                if (err.message === "Request failed with status code 400") {
                    setNoti("Có lỗi xảy ra");
                }
            });
    }
    const updatePassWordHandler = event => {
        event.preventDefault();
        const repeatPassword = document.getElementById("repeatPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        if (repeatPassword !== newPassword) {
            setNoti("Mật khẩu mới không khớp");
            setPassword({
                oldPassword: '',
                newPassword: ''
            });
            document.getElementById("repeatPassword").value = '';
            return;
        }
        axios.put("http://localhost:5000/user/user-changepassword", password, { withCredentials: true })
            .then(res => {
                alert(res.data.msg);
                setNoti('');
                setPassword({
                    oldPassword: '',
                    newPassword: ''
                });
                document.getElementById("repeatPassword").value = '';
            })
            .catch(err => {
                if (err.message === "Request failed with status code 400") {
                    setNoti("Mật khẩu cũ không đúng");
                    setPassword({
                        oldPassword: '',
                        newPassword: ''
                    });
                    document.getElementById("repeatPassword").value = '';
                }
            });
    }
    const onChange1 = event => {
        event.preventDefault();
        setFile(event.target.files[0])
    }
    const onChange2 = event => {
        event.preventDefault();
        setUpdateUser({ ...updateUser, [event.target.name]: event.target.value });
    }
    const onChange3 = event => {
        event.preventDefault();
        setPassword({ ...password, [event.target.name]: event.target.value });
    }
    const [file, setFile] = useState();
    const uploadHandler = event => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('file', file);
        axios.put("http://localhost:5000/user/profile/update-image", formdata, { withCredentials: true })
            .then(res => {
                window.location.href = "/my-profile"
            })
            .catch(err => {
                setNoti("Có lỗi xảy ra")
            });
    }
    return (
        <React.Fragment>
            <ToastContainer />
            <div className="main_profile">
                <h1>Thông tin tài khoản</h1>
                {profileState === 0
                    ? <div className="my_profile">
                        <div className="left_profile">
                            {user.image !== "Chưa có"
                                ? <img src={`http://localhost:5000/images/${user.image}`} alt="Hình đại diện" />
                                : <img src="https://i.imgflip.com/6yvpkj.jpg" alt="Hình đại diện" />}
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
                            <form className="upload_image" onSubmit={uploadHandler}>
                                <div className="image">
                                    <input type="file" accept="image/*" onChange={onChange1} />
                                </div>
                                <div className="buttons-1">
                                    {file ? <input type="submit" className="custom-button-1" value="Cập nhật" />
                                        : <button onClick={deleteImageHandler} className="custom-button-1">Xóa ảnh đại diện</button>}

                                    <button className="custom-button-1" onClick={changeToProfile}>Quay lại</button>
                                </div>
                            </form>
                        </div>
                        : profileState === 2
                            ? <div className="update_profile">
                                <p>{noti}</p>
                                <form onSubmit={updateProfileHandler}>
                                    <div className="my_profile">
                                        <div className="left_profile">
                                            {user.image !== "Chưa có"
                                                ? <img src={`http://localhost:5000/images/${user.image}`} alt="Hình đại diện" />
                                                : <img src="https://i.imgflip.com/6yvpkj.jpg" alt="Hình đại diện" />}
                                        </div>
                                        <div className="mid_profile">
                                            <input name='firstName' value={updateUser.firstName} onChange={onChange2} placeholder="Tên" required />
                                            <input name='lastName' value={updateUser.lastName} onChange={onChange2} placeholder="Họ" required />
                                            <input name='phoneNumber' value={updateUser.phoneNumber} onChange={onChange2} placeholder="Số điện thoại" required />
                                            <input name='dob' value={updateUser.dob} type="date" onChange={onChange2} placeholder="Ngày sinh" required />
                                        </div>
                                        <div className="right_profile">
                                            <input name='email' value={updateUser.email} onChange={onChange2} placeholder="Email" disabled />
                                            <input name='userName' value={updateUser.userName} onChange={onChange2} placeholder="Username" required />
                                            <select name='gender' value={updateUser.gender} onChange={onChange2} required>
                                                <option disabled>Giới tính của bạn là:</option>
                                                <option value="male">Nam</option>
                                                <option value="female">Nữ</option>
                                            </select>
                                            <select name='getNotice' value={updateUser.getNotice} onChange={onChange2} required >
                                                <option disabled>Nhận thông báo?</option>
                                                <option value="true">Có</option>
                                                <option value="false">Không</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="buttons-1">
                                        <input type="submit" className="custom-button-1" value="Cập nhật" />
                                        <button className="custom-button-1" onClick={changeToProfile}>Quay lại</button>
                                    </div>
                                </form>
                            </div>
                            : <div className="update_password">
                                <p>{noti}</p>
                                <form onSubmit={updatePassWordHandler}>
                                    <div className="profile_password">
                                        <input id="oldPassword" name='oldPassword' value={password.oldPassword} onChange={onChange3} type="password" placeholder="Mật khẩu cũ" required /><br></br>
                                        <input id="newPassword" name='newPassword' value={password.newPassword} onChange={onChange3} type="password" placeholder="Mật khẩu mới" required /><br></br>
                                        <input id="repeatPassword" placeholder="Nhập lại mật khẩu mới" type="password" required />
                                    </div>
                                    <div className="buttons-1">
                                        <input type="submit" className="custom-button-1" value="Cập nhật" />
                                        <button className="custom-button-1" onClick={changeToProfile}>Quay lại</button>
                                    </div>
                                </form>
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
            </div>
        </React.Fragment >
    )
}

export default ProfileMenu;