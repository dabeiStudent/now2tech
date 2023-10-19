import React from "react";

import './DetailModal.css';
const DetailModalUser = ({ user, onClose }) => {
    if (!user) {
        return null;
    }

    return (
        <div className="detail-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Chi tiết tài khoản</h2>
                <div className="table-container">
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
                </div>
            </div>
        </div>
    );
};

export default DetailModalUser;