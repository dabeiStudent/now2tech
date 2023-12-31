import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import ProfileMenu from './components/ProfileMenu';
import OrderMenu from './components/OrderMenu';
import './ProfilePage.css';
import { AuthContext } from "../../ultis/authContext";
const ProfilePage = () => {
    const naviget= useNavigate();
    const authContext = useContext(AuthContext);
    const [initialMenu, setInitialMenu] = useState(0);
    const signOutHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/user-logout`, '', { withCredentials: true });
            localStorage.removeItem('user');
            authContext.logout();
            naviget('/');
            // window.location.href = "/";
        } catch (err) {
            alert(err);
        }
    }
    const changeToProfile = event => {
        event.preventDefault();
        setInitialMenu(0);
    }
    const changeToOrder = event => {
        event.preventDefault();
        setInitialMenu(1);
    }
    return (
        <div className="profile__body">
            <div className="container">
                <div className="profile__page">
                    <div className="menu__left">
                        <div className="menu__left__element">
                            <div className="hello__profile">
                                <h2>THÔNG TIN</h2>
                            </div>
                            <div className="profile">
                                <label className={initialMenu === 0 ? 'profile_active' : ""} onClick={changeToProfile}>Hồ sơ</label>
                            </div>
                            <div className="order">
                                <label className={initialMenu === 1 ? 'profile_active' : ""} onClick={changeToOrder}>Đơn hàng</label>
                            </div>
                            <div className="logout">
                                <label onClick={signOutHandler}>Đăng xuất</label>
                            </div>
                        </div>
                    </div>
                    <div className="main">
                        {initialMenu === 0
                            ? <ProfileMenu />
                            : <OrderMenu />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;