import React, { useEffect } from "react";
import { useState } from "react";
import DetailModalUser from "./DetailModalUser";

import './UsersContent.css';
import axios from "axios";
const UsersContent = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUser] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/user/get-user', { withCredentials: true })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const handleEdit = (userId) => {
        console.log(`Edit user with ID ${userId}`);
    };

    const handleRemove = (userId) => {
        console.log(`Remove user with ID ${userId}`);
        // if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        //     axios.delete(`http://localhost:5000/product/remove-product/${productId}`, { withCredentials: true })
        //         .then((res) => {
        //             console.log('Xóa thành công');
        //         })
        //         .catch((err) => {
        //             console.log({ err: err });
        //         })
        // }
    };

    const handleBlock = (userId, userStatus) => {
        if (userStatus === "active") {
            console.log({
                type: 'block',
                userId: userId
            })
        } else {
            console.log({
                type: 'unblock',
                userId: userId
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
                <button className="add-product-button">Thêm sản phẩm</button>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr >
                                <th>id</th>
                                <th>firstName</th>
                                <th>lastName</th>
                                <th>gender</th>
                                <th>dob</th>
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
                                    <td className="product-cell">{user.gender}</td>
                                    <td className="product-cell">{user.dob}</td>
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