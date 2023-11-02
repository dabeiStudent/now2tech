import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './OrdersContent.css';
const OrdersContent = () => {
    const [orders, setOrder] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/order/all-order", { withCredentials: true })
            .then(res => (
                setOrder(res.data)
            ))
            .catch(err => (
                console.log(err)
            ));
    }, [])
    const handleStatusChange = (orderId, value) => {

    }
    return (
        <div className="product-content">
            <div className="table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Địa chỉ</th>
                            <th>Phương thức thanh toán</th>
                            <th>Trạng thái thanh toán</th>
                            <th>Trạng thái đơn hàng</th>
                            <th>Tổng giá tiền</th>
                            <th>Phí giao hàng</th>
                            <th>Tùy chỉnh</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.address}</td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                    {order.paymentStatus.isPaid ? (
                                        <span>Đã thanh toán ({order.paymentStatus.payId})</span>
                                    ) : (
                                        <span>Chưa thanh toán</span>
                                    )}
                                </td>
                                <td>{order.status}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.shippingFee}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        {['Not_proccessed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                                            <option key={status} value={status}>
                                                {status === 'Not_proccessed'
                                                    ? 'Chưa xử lý'
                                                    : status === 'Processing'
                                                        ? 'Đang xử lý'
                                                        : status === 'Shipped'
                                                            ? 'Đã gửi'
                                                            : status === 'Delivered'
                                                                ? 'Đã giao'
                                                                : 'Đã hủy'}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <button className="detail-button"><NavLink to={`/chi-tiet-don-hang/${order._id}`}>Chi tiết</NavLink></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default OrdersContent;