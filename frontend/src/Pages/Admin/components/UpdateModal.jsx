import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap';

import './UpdateModal.css';

const UpdateModal = props => {
    const [account, setAccount] = useState(props.user);
    // if (!user) {
    //     return null;
    // }

    const onChange = event => {
        event.preventDefault();
        setAccount({ ...account, [event.target.name]: event.target.value });
    }

    const handleUpdate = event => {
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/user-update/${account._id}`, account, { withCredentials: true })
            .then(result => {
                props.closeUpdateModal();
                props.reload();
                toast("Cập nhật thành công");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Modal dialogClassName='modal-custom' show={props.showUpdate} onHide={props.closeUpdateModal}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật tài khoản</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleUpdate}>
                <Modal.Body>
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
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary'type='submit'>Cập nhật</Button>
                </Modal.Footer>
            </Form>
        </Modal>
       
    );
}

export default UpdateModal;