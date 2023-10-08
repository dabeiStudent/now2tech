import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { faEnvelope, faLock, faUser, faH, faT, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './SignUpPage.css';
import axios from "axios";
const SignUpPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ firstName: '', lastName: '', phoneNumber: '', userName: '', email: '', passWord: '' });
    const [noti, setNoti] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const signUpHandler = event => {
        event.preventDefault();
        axios.post('http://localhost:5000/user/user-register', user, { withCredentials: true })
            .then(result => {
                alert(`${result.data.msg}`);
                setUser({ firstName: '', lastName: '', phoneNumber: '', userName: '', email: '', passWord: '' });
                navigate('/login');
            })
            .catch(err => {
                if (err.message === "Request failed with status code 400") {
                    setNoti('Username không hợp lệ');
                } else if (err.message === "Request failed with status code 403") {
                    setNoti("Email đã được sử dụng")
                }
            })
    }
    const onChange = event => {
        event.preventDefault();
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    const changeToSignIn = event => {
        event.preventDefault();
        navigate('/login');
    }
    return (
        <div className="container">
            <div className="form__signup">
                <form className="element__signup" onSubmit={signUpHandler}>
                    <div className="error_signup">
                        {noti}
                    </div>
                    <div>
                        <h1>Đăng ký tài khoản</h1>
                    </div>
                    <div className="left-form">
                        <div className="input">
                            <FontAwesomeIcon icon={faT} />
                            <input name="firstName" value={user.firstName} onChange={onChange} type="text" placeholder="Nhập tên tại đây" required />
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faH} />
                            <input name="lastName" value={user.lastName} onChange={onChange} type="text" placeholder="Nhập họ tại đây" required />
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faPhone} />
                            <input name="phoneNumber" value={user.phoneNumber} onChange={onChange} type="text" placeholder="Số điện thoại" required />
                        </div>
                    </div>
                    <div className="right-form">
                        <div className="input">
                            <FontAwesomeIcon icon={faUser} />
                            <input name="userName" value={user.userName} onChange={onChange} type="text" placeholder="Username" required />
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input name="email" value={user.email} onChange={onChange} type="email" placeholder="Email" required />
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faLock} />
                            <input name="passWord" value={user.passWord} onChange={onChange} type="password" placeholder="Mật khẩu" required />
                        </div>
                    </div>
                    <div className="input">
                        <input type="submit" value="TIẾP TỤC" />
                    </div>
                    <div>
                        <p onClick={changeToSignIn}>Đăng nhập</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage