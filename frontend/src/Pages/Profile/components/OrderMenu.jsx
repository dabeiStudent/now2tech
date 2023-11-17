import axios from "axios";
import React, { useEffect, useState } from "react";

import './OrderMenu.css';
import { NavLink } from "react-router-dom";
const OrderMenu = () => {
    const [orders, setOrder] = useState([])
    const [selectedStatus, setSelectedStatus] = useState([]);

    const handleCheckboxChange = (status) => {
        setSelectedStatus(status === selectedStatus ? '' : status);
    };
    useEffect(() => {
        axios.get('http://localhost:5000/order/my-order', { withCredentials: true })
            .then(res => setOrder(res.data))
            .catch(err => console.log(err))
    }, []);
    const filteredOrders = orders.filter((order) => {
        if (selectedStatus.length !== 0) {
            return order.status.includes(selectedStatus);
        }
        else {
            return order;
        }
    });
    return (
        <React.Fragment>
            <h2>Đơn hàng của bạn</h2>
            <div className="status-checkboxes">
                <h2>Lọc theo trạng thái đơn hàng: </h2>
                <label>
                    <input
                        type="checkbox"
                        value="Not_proccessed"
                        checked={selectedStatus.includes('Not_proccessed')}
                        onChange={() => handleCheckboxChange('Not_proccessed')}
                    />
                    Chưa xử lý
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Processing"
                        checked={selectedStatus.includes('Processing')}
                        onChange={() => handleCheckboxChange('Processing')}
                    />
                    Đang xử lý
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Shipped"
                        checked={selectedStatus.includes('Shipped')}
                        onChange={() => handleCheckboxChange('Shipped')}
                    />
                    Đã gửi
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Delivered"
                        checked={selectedStatus.includes('Delivered')}
                        onChange={() => handleCheckboxChange('Delivered')}
                    />
                    Đã giao
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Cancelled"
                        checked={selectedStatus.includes('Cancelled')}
                        onChange={() => handleCheckboxChange('Cancelled')}
                    />
                    Đã hủy
                </label>
            </div>
            <div className="my-order">
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Trạng thái</th>
                            <th>Sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => {
                            // Tính tổng giá tiền cho đơn hàng
                            const totalAmount = order.items.reduce((total, item) => total + item.qty * item.price, 0);

                            return (
                                <tr key={order._id} >
                                    <td className="oid_row">{order._id}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <ul>
                                            {order.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    {item.name} - {item.price} - {item.qty}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="oid_row">{totalAmount} VND - {order.paymentMethod}</td> {/* Hiển thị tổng giá tiền */}
                                    <td>
                                        <NavLink to={`/chi-tiet-don-hang/${order._id}`}>
                                            <button>Chi tiết</button>
                                        </NavLink>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment >
    )
}

export default OrderMenu;