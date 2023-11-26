import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import axios from "axios";

import './DetailModalUser.css';
import Loader from "../../../components/UIElement/Loader";

const DetailModalUser = props => {
    const [isOpenModal, setIsOpenModal]= useState(false);
    const [user, setUser]= useState();
    const closeModalHandler= ()=> {
        setIsOpenModal(false);
    }

    const openModalHandler= ()=> {
        setIsOpenModal(true);
    };

    useEffect(()=> {
        const getUser= async ()=> {
            await axios.get(`http://localhost:5000/user/get-user/${props.userId}`, { withCredentials: true })
            .then(res=> setUser(res.data))
            .catch(err=> console.log(err))
        };
        getUser();
    }, [props.userId])
    return (
        <div>
            <div className="button-product-content">
                <button className="detail-button" onClick={openModalHandler}>Chi tiết</button>
            </div>
            <Modal dialogClassName='modal-custom' show={isOpenModal} onHide={closeModalHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user ? (
                        <table className="product-details">
                            <tbody>
                                <tr>
                                    <td>ID:</td>
                                    <td>{user._id}</td>
                                </tr>
                                <tr>
                                    <td>Tên:</td>
                                        <td>{user.lastName}</td>
                                </tr>
                                <tr>
                                <td>Họ:</td>
                                    <td>{user.firstName}</td>
                                </tr>
                                <tr>
                                    <td>Giới tính:</td>
                                    <td>{user.gender}</td>
                                </tr>
                                <tr>
                                    <td>Ngày sinh:</td>
                                    <td>{user.dob}</td>
                                </tr>
                                <tr>
                                    <td>Username:</td>
                                    <td>{user.userName}</td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại:</td>
                                    <td>{user.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>Trạng thái:</td>
                                    <td>{user.status}</td>
                                </tr>
                                <tr>
                                    <td>Nhận thông báo:</td>
                                    <td>{user.getNotice ? "Có" : "Không"}</td>
                                </tr>
                            </tbody>
                        </table>
                       
                    ) : (<Loader/>)}
                    
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DetailModalUser;