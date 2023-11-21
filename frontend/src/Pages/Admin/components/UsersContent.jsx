import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailModalUser from "./DetailModalUser";
import UserCard from "../../../components/UIElement/UserCard";
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
        console.log("Open Edit Modal for:", user);
        setShowUpdate(true);
        setSelectedUser(user);
    };
    const closeEditModal = event => {
        setShowUpdate(false);
        setState(prevState => !prevState);
    }

    const handleRemove = (userId) => {
        if (window.confirm('Bạn có chắc muốn xóa tài khoản này?')) {
            axios.delete(`http://localhost:5000/user/user-remove/${userId}`, { withCredentials: true })
                .then((res) => {
                    toast('Xóa thành công');
                    setState(!state);
                })
                .catch((err) => {
                    toast('Không thể xóa tài khoản admin');
                    console.log({ err: err });
                })
        }
    };

    const handleBlock = (userId, userStatus) => {
        if (userStatus === "active") {
            axios.put(`http://localhost:5000/user/user-status/${userId}/1`, '', { withCredentials: true })
                .then(result => {
                    toast("Đã khóa tài khoản");
                    setState(!state);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios.put(`http://localhost:5000/user/user-status/${userId}/0`, '', { withCredentials: true })
                .then(result => {
                    toast("Đã mở khóa tài khoản");
                    setState(!state);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const openDetailModal = (user) => {
        console.log("Open Detail Modal for:", user);

        setShowDetail(true);
        setSelectedUser(user);
    }

    const closeDetailModal = () => {
        setShowDetail(false);
        setSelectedUser(null);
    }
    return (
        <React.Fragment>
            <ToastContainer />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm username/email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="product-content">
                <div className="table-container-user">
                    <div className="user-cards-container">
                        {filteredUsers.map((user) => (
                            <React.Fragment>
                                <div className="group-user">
                                    <UserCard key={user._id}
                                        user={user}
                                        detail={() => openDetailModal()}
                                        edit={() => handleEdit()}
                                        block={() => handleBlock(user._id, user.status)}
                                        remove={() => handleRemove(user._id)} />
                                    <div className="button-container">
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
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UsersContent;