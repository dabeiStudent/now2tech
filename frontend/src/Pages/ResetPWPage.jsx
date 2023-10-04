import React from "react";
import { useState } from "react";
import axios from "axios";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import './ResetPWPage.css';
const ResetPWPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '' });
    const [noti, setNoti] = useState('');
    const onChange = event => {
        event.preventDefault();
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    const changeToLogin = event => {
        event.preventDefault();
        navigate('/login');
    }
    const resetPasswordHandler = event => {
        event.preventDefault();
        axios.post("http://localhost:5000/user/reset-password/send-request", user,
            { withCredentials: true }
        )
            .then(res => {
                console.log(user);
                setNoti(res.data.msg);
                setUser({ email: '' });;
            })
            .catch((err) => {
                alert(`Email hoặc mật khẩu không đúng`);
            })
    }
    return (
        <div className="container">
            <div className="form__rspw">
                <form className="element__rspw" onSubmit={resetPasswordHandler}>
                    <div className="notification">
                        {noti}
                    </div>
                    <div>
                        <h1>Lấy lại mật khẩu</h1>
                    </div>
                    <div className="input">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input name="email" value={user.email} onChange={onChange} type="email" placeholder="Nhập email tại đây" required />
                    </div>
                    <div className="input">
                        <input type="submit" value="TIẾP TỤC" />
                    </div>
                    <div className="extra__rspw">
                        <p onClick={changeToLogin}>Đăng nhập</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPWPage;