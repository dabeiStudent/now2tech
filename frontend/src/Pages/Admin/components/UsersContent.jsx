import React, { useEffect } from "react";
import { useState } from "react";
import DetailModalUser from "./DetailModalUser";

import './UsersContent.css';
import axios from "axios";
import UpdateModal from "./UpdateModal";
const UsersContent = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUser] = useState([]);
    const [state, setState] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    useEffect(() => {
        axios.get('http://localhost:5000/user/get-user', { withCredentials: true })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [state]);
    const filteredUsers = users.filter((user) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            user.userName.toLowerCase().includes(searchTermLowerCase) ||
            user.email.toLowerCase().includes(searchTermLowerCase)
        );
    });
    const handleEdit = (user) => {
        setShowUpdate(true);
        setSelectedUser(user);
    };
    const closeEditModal = event => {
        event.preventDefault();
        setShowUpdate(false);
        setState(!state);
    }

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
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm username/email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="product-content">
                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr >
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Họ</th>
                                <th>Số điện thoại</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="product-row">
                                    <td className="product-cell">{user._id}</td>
                                    <td className="product-cell">{user.firstName}</td>
                                    <td className="product-cell">{user.lastName}</td>
                                    <td className="product-cell">{user.phoneNumber}</td>
                                    <td className="product-cell">{user.userName}</td>
                                    <td className="product-cell">{user.email}</td>
                                    <td className="product-cell">
                                        <button className="detail-button" onClick={() => openDetailModal(user)}>Chi tiết</button>
                                        <button className="edit-button" onClick={() => handleEdit(user)}>Cập nhật</button>
                                        {showUpdate && selectedUser && (
                                            <UpdateModal user={selectedUser} onClose={closeEditModal} />
                                        )}
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