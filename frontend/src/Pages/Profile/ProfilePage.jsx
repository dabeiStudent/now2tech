import React, { useState, useContext } from "react";
import axios from "axios";
import ProfileMenu from './components/ProfileMenu';
import OrderMenu from './components/OrderMenu';
import './ProfilePage.css';

import { AuthContext } from "../../ultis/authContext";
const ProfilePage = () => {
    const authContext= useContext(AuthContext);
    const [initialMenu, setInitialMenu] = useState(0);
    const signOutHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/user/user-logout', '', { withCredentials: true });
            localStorage.removeItem('user');
            authContext.logout();
            window.location.href = "/";
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
                                <h2>Thông tin</h2>
                            </div>
                            <div className="profile">
                                <label onClick={changeToProfile}>Hồ sơ</label>
                            </div>
                            <div className="order">
                                <label onClick={changeToOrder}>Đơn hàng</label>
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