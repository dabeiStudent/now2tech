import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './OrdersContent.css';
const OrdersContent = () => {
    const [orders, setOrder] = useState([]);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:5000/order/all-order", { withCredentials: true })
            .then(res => (
                setOrder(res.data)
            ))
            .catch(err => (
                console.log(err)
            ));
    }, [flag])
    const handleStatusChange = (orderId, value) => {
        if (value === "Shipped") {
            axios.put(`http://localhost:5000/order/update-status-shipped/${orderId}/${value}`, '', { withCredentials: true })
                .then(result => {
                    alert("Đã gửi hàng cho shipper");
                    setFlag(!flag);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios.put(`http://localhost:5000/order/update-status/${orderId}/${value}`, '', { withCredentials: true })
                .then(result => {
                    alert("Cập nhật thành công");
                    setFlag(!flag);
                })
                .catch(err => {
                    console.log(err);
                })
        }
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
                            <th>Tổng giá tiền</th>
                            <th>Phí giao hàng</th>
                            <th>Trạng thái đơn hàng</th>
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
                                <td>{order.totalPrice}</td>
                                <td>{order.shippingFee}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option key={order.status} value={order.status} disabled>
                                            {order.status === 'Not_proccessed'
                                                ? 'Chưa xử lý'
                                                : order.status === 'Processing'
                                                    ? 'Đang xử lý'
                                                    : order.status === 'Shipped'
                                                        ? 'Đã gửi'
                                                        : order.status === 'Delivered'
                                                            ? 'Đã giao'
                                                            : 'Đã hủy'}
                                        </option>

                                        <option value="Not_proccessed">Chưa xử lý</option>
                                        <option value="Processing">Đang xử lý</option>
                                        <option value="Shipped">Đã gửi</option>
                                        <option value="Delivered">Đã giao</option>
                                        <option value="Cancelled">Đã hủy</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="detail-button" >
                                        <NavLink to={`/chi-tiet-don-hang/${order._id}`}>Chi tiết</NavLink>
                                    </button>
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