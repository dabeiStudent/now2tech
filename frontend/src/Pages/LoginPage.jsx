import React, { useState } from "react";
import axios from "axios";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', passWord: '' });

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
                setUser({ email: '', passWord: '' });
                navigate('/');
            })
            .catch((err) => {
                alert(`Email hoặc mật khẩu không đúng`);
            })
    }
    const changeToSignUp = event => {
        event.preventDefault();
        navigate('/signup');
    }
    return (
        <div className="container">
            <div className="form__login">
                <form className="element__login" onSubmit={loginHandler}>
                    <h1>Đăng nhập</h1><br></br>
                    <input name="email" value={user.email} onChange={onChange} type="text" placeholder="Nhập email tại đây" /><br></br>
                    <input name="passWord" value={user.passWord} onChange={onChange} type="password" placeholder="Nhập mật khẩu tại đây" /><br></br>
                    <input type="submit" value="TIẾP TỤC" /><br></br>
                    <p onClick={changeToSignUp}>ĐĂNG KÝ TÀI KHOẢN</p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;