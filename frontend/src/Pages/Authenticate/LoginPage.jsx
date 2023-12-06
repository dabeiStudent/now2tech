import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import './LoginPage.css';
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../ultis/authContext";
const LoginPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', passWord: '' });
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    const onChange = event => {
        event.preventDefault();
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    const loginHandler = event => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/user-login`, user,
            { withCredentials: true }
        )
            .then(res => {
                setUser({ email: '', passWord: '' });
                authContext.login();
                navigate(-1);
                // window.location.href = "/";
            })
            .catch((err) => {
                if (err.message === "Request failed with status code 404") {
                    toast('Email/Mật khẩu không đúng');
                } else if (err.message === "Request failed with status code 400") {
                    toast('Tài khoản đang bị khóa');
                }
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
                        {/* <ToastContainer /> */}
                    </div>
                    <div className="label-login">
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



