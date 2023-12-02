import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'

import DetailModalUser from '../../Pages/Admin/components/DetailModalUser';
import UpdateModal from '../../Pages/Admin/components/UpdateModal'

import './UserCard.css';

const UserCard = props => {
    const { firstName, lastName, gender, dob, phoneNumber, userName, email, role, image, status, getNotice } = props.user;
    const [showDetail, setShowDetail]= useState(false);
    const [showUpdate, setShowUpdate]= useState(false);

    const openDetailModalHandler= ()=> {
       setShowDetail(true);
    }

    const closeDetailModalHandler= ()=> {
        setShowDetail(false);
    }

    const openUpdateModalHandler= ()=> {
        setShowUpdate(true);
     }
 
     const closeUpdateModalHandler= ()=> {
         setShowUpdate(false);
     }

    const handleBlock = (userId, userStatus) => {
        if (userStatus === "active") {
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/user-status/${userId}/1`, '', { withCredentials: true })
                .then(result => {
                    props.reload();
                    toast("Đã khóa tài khoản");
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/user-status/${userId}/0`, '', { withCredentials: true })
                .then(result => {
                    props.reload();
                    toast("Đã mở khóa tài khoản");
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const reloadHandler= ()=> {
        props.reload();
    }

    const handleRemove = (userId) => {
        if (window.confirm('Bạn có chắc muốn xóa tài khoản này?')) {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user/user-remove/${userId}`, { withCredentials: true })
                .then((res) => {
                    props.reload();
                    toast('Xóa thành công');
                })
                .catch((err) => {
                    toast('Không thể xóa tài khoản admin');
                    console.log({ err: err });
                })
        }
    };

    return (
        <div className="user-card">
            {image === "Chưa có" || image === "Chua co" || !image
                ? <img src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' alt={`${firstName} ${lastName}`} />
                : <img src={image} alt={`${firstName} ${lastName}`} />}
            <div className="user-details">
                <h3>{`${firstName} ${lastName}`}</h3>
                <p>
                    <strong>Username:</strong>
                    <span>{userName || 'N/A'}</span>
                </p>
                <p>
                    <strong>Email:</strong>
                    <span>{email}</span>
                </p>
                <p>
                    <strong>Vai trò:</strong>
                    <span>{role || 'N/A'}</span>
                </p>
                <p>
                    <strong>Giới tính:</strong>
                    <span>{gender || 'N/A'}</span> 
                </p>
                <p>
                    <strong>Trạng thái:</strong>
                    <span>{status || 'N/A'}</span> 
                </p>
                <p>
                    <strong>Thông báo:</strong>
                    <span>{getNotice ? 'Yes' : 'No'}</span> 
                </p>
            </div>
            <div className='user-card__footer'>
                <div className='group-top'>
                    <button onClick={openUpdateModalHandler} className='update-btn'>Cập nhật</button>
                    {status === 'active' ? (
                        <button onClick={()=> handleBlock(props.user._id, status)} className='block-btn'>Khóa</button>
                    ): (
                        <button onClick={()=> handleBlock(props.user._id, status)} className='block-btn'>Mở khóa</button>
                    )}
                    <button onClick={()=> handleRemove(props.user._id)} className='remove-btn'>Xóa</button>
                </div>
                <div className='group-bottom'>
                    <button onClick={openDetailModalHandler} className='detail-btn'>Xem chi tiết</button>
                </div>
            </div>
            <DetailModalUser 
                showDetail={showDetail} 
                closeDetailModalHandler={()=> closeDetailModalHandler} 
                openDetailModal={()=> openDetailModalHandler}  
                user={props.user}/>
            <UpdateModal
                showUpdate={showUpdate}
                reload={reloadHandler}
                closeUpdateModal={closeUpdateModalHandler}
                openUpdateModal={openUpdateModalHandler}
                user={props.user}/>
        </div>
    );
};

export default UserCard;
