import React, { useEffect } from "react";
import { useState } from "react";
import DetailModalUser from "./DetailModalUser";

import './UsersContent.css';
import axios from "axios";
const UsersContent = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUser] = useState([]);
    const [state, setState] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:5000/user/get-user', { withCredentials: true })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [state]);
    const handleEdit = (userId) => {
        console.log(`Edit user with ID ${userId}`);
    };

    const handleRemove = (userId) => {
        if (window.confirm('Bạn có chắc muốn xóa tài khoản này?')) {
            axios.delete(`http://localhost:5000/user/user-remove/${userId}`, { withCredentials: true })
                .then((res) => {
                    alert('Xóa thành công');
                    setState(!state);
                })
                .catch((err) => {
                    alert('Không thể xóa tài khoản admin');
                    console.log({ err: err });
                })
        }
    };

    const handleBlock = (userId, userStatus) => {
        if (userStatus === "active") {
            axios.put(`http://localhost:5000/user/user-status/${userId}/1`, '', { withCredentials: true })
                .then(result => {
                    alert("Đã khóa tài khoản");
                    setState(!state);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios.put(`http://localhost:5000/user/user-status/${userId}/0`, '', { withCredentials: true })
                .then(result => {
                    alert("Đã mở khóa tài khoản");
                    setState(!state);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const openDetailModal = (user) => {
        setShowDetail(true);
        setSelectedUser(user);
    }

    const closeDetailModal = () => {
        setShowDetail(false);
        setSelectedUser(null);
    }
    return (
        <React.Fragment>
            <div className="product-content">
                <button className="add-product-button">Thêm tài khoản</button>
                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr >
                                <th>id</th>
                                <th>firstName</th>
                                <th>lastName</th>
                                <th>phoneNumber</th>
                                <th>userName</th>
                                <th>email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="product-row">
                                    <td className="product-cell">{user._id}</td>
                                    <td className="product-cell">{user.firstName}</td>
                                    <td className="product-cell">{user.lastName}</td>
                                    <td className="product-cell">{user.phoneNumber}</td>
                                    <td className="product-cell">{user.userName}</td>
                                    <td className="product-cell">{user.email}</td>
                                    <td className="product-cell">
                                        <button className="detail-button" onClick={() => openDetailModal(user)}>Chi tiết</button>
                                        <button className="edit-button" onClick={() => handleEdit(user._id)}>Cập nhật</button>
                                        {user.status === "active"
                                            ? <button className="block-button" onClick={() => handleBlock(user._id, user.status)}>Khóa</button>
                                            : <button className="block-button" onClick={() => handleBlock(user._id, user.status)}>Mở khóa</button>}

                                        <button className="remove-button" onClick={() => handleRemove(user._id)}>Xóa</button>
                                        {showDetail && selectedUser && (
                                            <DetailModalUser user={selectedUser} onClose={closeDetailModal} />)}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </React.Fragment>
    );
};

export default UsersContent;