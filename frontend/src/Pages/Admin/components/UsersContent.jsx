import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import UserCard from "../../../components/UIElement/UserCard";
import './UsersContent.css';

const UsersContent = () => {
    const [users, setUser] = useState([]);
    const [isReload, setIsReload]= useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-user`, { withCredentials: true })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [isReload]);
    const filteredUsers = users.filter((user) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            user.userName.toLowerCase().includes(searchTermLowerCase) ||
            user.email.toLowerCase().includes(searchTermLowerCase)
        );
    });

    const reloadHandler= ()=> {
        setIsReload(!isReload);
    }

    return (
        <div className="user-content">
            <ToastContainer />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm username/email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="user-list">
                {filteredUsers.map(user=> (
                    <UserCard reload={()=> reloadHandler()} key={user._id} user={user}/>
                ))}
            </div>
        </div>
    );
};

export default UsersContent;