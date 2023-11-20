import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './OrdersContent.css';
const OrdersContent = () => {
    const [orders, setOrder] = useState([]);
    const [flag, setFlag] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState([]);

    const handleCheckboxChange = (status) => {
        setSelectedStatus(status === selectedStatus ? '' : status);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    useEffect(() => {
        axios.get("http://localhost:5000/order/all-order", { withCredentials: true })
            .then(res => (
                setOrder(res.data)
            ))
            .catch(err => (
                console.log(err)
            ));
    }, [flag])
    const filteredOrders = orders.filter((order) => {
        if (searchTerm) {
            return order._id.includes(searchTerm);
        } else if (selectedStatus.length !== 0) {
            return (
                order.status.includes(selectedStatus) ||
                order.paymentMethod.includes(selectedStatus)
            );
        }
        else {
            return order;
        }
    });
    const handleStatusChange = (orderId, value) => {
        if (value === "Shipped") {
            axios.put(`http://localhost:5000/order/update-status-shipped/${orderId}/${value}`, '', { withCredentials: true })
                .then(result => {
                    toast("Đã gửi hàng cho shipper");
                    setFlag(!flag);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios.put(`http://localhost:5000/order/update-status/${orderId}/${value}`, '', { withCredentials: true })
                .then(result => {
                    toast("Cập nhật thành công");
                    setFlag(!flag);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className="product-content">
            <ToastContainer />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo mã đơn hàng"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
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
            <div className="status-checkboxes">
                <h2>Lọc theo phương thức thanh toán: </h2>
                <label>
                    <input
                        type="checkbox"
                        value="COD"
                        checked={selectedStatus.includes('COD')}
                        onChange={() => handleCheckboxChange('COD')}
                    />
                    COD
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="VNPAY"
                        checked={selectedStatus.includes('VNPAY')}
                        onChange={() => handleCheckboxChange('VNPAY')}
                    />
                    VNPAY
                </label>
            </div>
            <div className="table-container_1">
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
                        {filteredOrders.map((order) => (
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
                                        <NavLink className="order-navlink-button" to={`/chi-tiet-don-hang/${order._id}`}>Chi tiết</NavLink>
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