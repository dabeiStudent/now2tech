import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateModal.css';
const UpdateModal = ({ user, onClose }) => {
    const [account, setAccount] = useState(user);
    if (!user) {
        return null;
    }
    const onChange = event => {
        event.preventDefault();
        setAccount({ ...account, [event.target.name]: event.target.value });
    }
    const handleUpdate = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/user/user-update/${account._id}`, account, { withCredentials: true })
            .then(result => {
                toast("Cập nhật thành công");
                onClose();
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="update-modal">
            <ToastContainer />
            <div className="update-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleUpdate}>
                    <h2>Cập nhật tài khoản</h2>
                    <div className="table-container">
                        <table className="product-details">
                            <tbody>
                                <tr>
                                    <td>ID:</td>
                                    <td>{account._id}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{account.email}</td>
                                </tr>
                                <tr>
                                    <td>Họ:</td>
                                    <td><input type="text" name="lastName" onChange={onChange} value={account.lastName} /></td>
                                </tr>
                                <tr>
                                    <td>Tên:</td>
                                    <td><input type="text" name="firstName" onChange={onChange} value={account.firstName} /></td>
                                </tr>
                                <tr>
                                    <td>Giới tính:</td>
                                    <td>
                                        <select name="gender" onChange={onChange} value={account.gender}>
                                            <option value=""></option>
                                            <option value="Male">Nam</option>
                                            <option value="Female">Nữ</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày sinh:</td>
                                    <td><input type="date" name="dob" onChange={onChange} value={account.dob} /></td>
                                </tr>
                                <tr>
                                    <td>Username:</td>
                                    <td><input type="text" name="userName" onChange={onChange} value={account.userName} /></td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại:</td>
                                    <td><input type="text" name="phoneNumber" onChange={onChange} value={account.phoneNumber} /></td>
                                </tr>
                                <tr>
                                    <td>Trạng thái:</td>
                                    <td><input type="text" name="status" onChange={onChange} value={account.status} readOnly /></td>
                                </tr>
                                <tr>
                                    <td>Nhận thông báo:</td>
                                    <td>
                                        <select name="getNotice" onChange={onChange} value={account.getNotice}>
                                            <option value={true}>Có</option>
                                            <option value={false}>Không</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button className="edit-button" type="submit" >Cập nhật</button>
                </form>
            </div>
        </div >
    );
}

export default UpdateModal;