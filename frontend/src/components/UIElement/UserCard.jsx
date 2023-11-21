import React from 'react';

import './UserCard.css';
const UserCard = ({ user, detail, edit, block, remove }) => {
    const { firstName, lastName, gender, dob, phoneNumber, userName, email, role, image, status, getNotice } = user;

    return (
        <div className="user-card">
            {image == "Chưa có" || image == "Chua co" || !image
                ? <img src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' alt={`${firstName} ${lastName}`} />
                : <img src={`http://localhost:5000/images/${image}`} alt={`${firstName} ${lastName}`} />}
            <div className="user-details">
                <h3>{`${firstName} ${lastName}`}</h3>
                <p>
                    <strong>Username:</strong> {userName || 'N/A'}
                </p>
                <p>
                    <strong>Email:</strong> {email}
                </p>
                <p>
                    <strong>Vai trò:</strong> {role || 'N/A'}
                </p>
                <p>
                    <strong>Giới tính:</strong> {gender || 'N/A'}
                </p>
                <p>
                    <strong>Trạng thái:</strong> {status || 'N/A'}
                </p>
                <p>
                    <strong>Thông báo:</strong> {getNotice ? 'Yes' : 'No'}
                </p>
            </div>
        </div>
    );
};

export default UserCard;
