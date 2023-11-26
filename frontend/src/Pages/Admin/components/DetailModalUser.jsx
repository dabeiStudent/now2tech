import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import axios from "axios";

import './DetailModalUser.css';

const DetailModalUser = props => {
    // const [user, setUser]= useState();
    
    // useEffect(()=> {
    //     const getUser= async ()=> {
    //         await axios.get(`http://localhost:5000/user/get-user/${props.userId}`, { withCredentials: true })
    //         .then(res=> setUser(res.data))
    //         .catch(err=> console.log(err))
    //     };
    //     getUser();
    // }, [props.userId]);

    return (
        <div>
            <Modal dialogClassName='modal-custom' show={props.showDetail} onHide={props.closeDetailModalHandler()}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="product-details">
                        <tbody>
                            <tr>
                                <td>ID:</td>
                                <td>{props.user._id}</td>
                            </tr>
                            <tr>
                                <td>Tên:</td>
                                <td>{props.user.lastName}</td>
                            </tr>
                            <tr>
                                <td>Họ:</td>
                                <td>{props.user.firstName}</td>
                            </tr>
                            <tr>
                                <td>Giới tính:</td>
                                <td>{props.user.gender}</td>
                            </tr>
                            <tr>
                                <td>Ngày sinh:</td>
                                <td>{props.user.dob}</td>
                            </tr>
                            <tr>
                                <td>Username:</td>
                                <td>{props.user.userName}</td>
                            </tr>
                            <tr>
                                <td>Số điện thoại:</td>
                                <td>{props.user.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{props.user.email}</td>
                            </tr>
                            <tr>
                                <td>Trạng thái:</td>
                                <td>{props.user.status}</td>
                            </tr>
                            <tr>
                                <td>Nhận thông báo:</td>
                                <td>{props.user.getNotice ? "Có" : "Không"}</td>
                            </tr>
                        </tbody>
                    </table>                    
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DetailModalUser;