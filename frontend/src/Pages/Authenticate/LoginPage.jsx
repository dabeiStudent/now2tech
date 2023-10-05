import React, { useState } from "react";
import axios from "axios";
import './LoginPage.css';
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', passWord: '' });
    const [noti, setNoti] = useState('');
    const onChange = event => {
        event.preventDefault();
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    const loginHandler = event => {
        event.preventDefault();
        axios.post("http://localhost:5000/user/user-login", user,
            { withCredentials: true }
        )
            .then(res => {
                alert(`${res.data.msg}`);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setUser({ email: '', passWord: '' });
                window.location.href = "/";
            })
            .catch((err) => {
                setNoti('Email/Mật khẩu không đúng')
            })
    }
    const changeToSignUp = event => {
        event.preventDefault();
        navigate('/signup');
    }
    const changeToResetPassword = event => {
        event.preventDefault();
        navigate('/reset-password');
    }
    return (
        <div className="container">
            <div className="form__login">
                <form className="element__login" onSubmit={loginHandler}>
                    <div className="error_signup">
                        {noti}
                    </div>
                    <div>
                        <h1>Đăng nhập</h1>
                    </div>
                    <div className="input">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input name="email" value={user.email} onChange={onChange} type="text" placeholder="Nhập email tại đây" required />
                    </div>
                    <div className="input">
                        <FontAwesomeIcon icon={faLock} />
                        <input name="passWord" value={user.passWord} onChange={onChange} type="password" placeholder="Nhập mật khẩu tại đây" required />
                    </div>
                    <div className="input">
                        <input type="submit" value="TIẾP TỤC" />
                    </div>
                    <div>
                        <p onClick={changeToSignUp}>Đăng ký tài khoản</p>
                        <p onClick={changeToResetPassword}>Quên tài khoản</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;