import axios from "axios";
import React, { useEffect, useState } from "react";

import './OrderMenu.css';
import { NavLink } from "react-router-dom";
const OrderMenu = () => {
    const [orders, setOrder] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/order/my-order', { withCredentials: true })
            .then(res => setOrder(res.data))
            .catch(err => console.log(err))
    }, []);
    return (
        <React.Fragment>
            <h2>Đơn hàng của bạn</h2>
            <div className="my-order">
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Trạng thái</th>
                            <th>Phương thức thanh toán</th>
                            <th>Sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            // Tính tổng giá tiền cho đơn hàng
                            const totalAmount = order.items.reduce((total, item) => total + item.qty * item.price, 0);

                            return (
                                <tr key={order._id} >
                                    <td className="oid_row">{order._id}</td>
                                    <td>{order.status}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>
                                        <ul>
                                            {order.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="oid_row">{totalAmount} VND</td> {/* Hiển thị tổng giá tiền */}
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