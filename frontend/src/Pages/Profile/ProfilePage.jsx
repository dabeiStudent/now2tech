import React from "react";
import axios from "axios";

const ProfilePage = () => {
    const signOutHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/user/user-logout', '', { withCredentials: true });
            localStorage.removeItem('user');
            window.location.href = "/";
        } catch (err) {
            alert(err);
        }
    }
    return (
        <React.Fragment>
            <h1>Hello bro</h1>
            <a onClick={signOutHandler}>Đăng xuất</a>
        </React.Fragment>
    )
}

export default ProfilePage;