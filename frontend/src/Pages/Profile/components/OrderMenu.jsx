import axios from "axios";
import React, { useEffect, useState } from "react";

import './OrderMenu.css';
import { NavLink } from "react-router-dom";
const statusMapping = {
    'Not_proccessed': 'Chờ xác nhận',
    'Processing': 'Đang chuẩn bị hàng',
    'Shipped': 'Đang giao',
    'Delivered': 'Giao thành công',
    'Cancelled': 'Đã hủy'
};
const OrderMenu = () => {
    const [orders, setOrder] = useState([])
    const [selectedStatus, setSelectedStatus] = useState([]);

    const handleCheckboxChange = (status) => {
        setSelectedStatus(status === selectedStatus ? '' : status);
    };
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/my-order`, { withCredentials: true })
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
            <h1>Đơn hàng của bạn</h1>
            <div className="status-checkboxes">
                {Object.keys(statusMapping).map((statusKey) => (
                    <label key={statusKey}>
                        <input
                            type="checkbox"
                            value={statusKey}
                            checked={selectedStatus.includes(statusKey)}
                            onChange={() => handleCheckboxChange(statusKey)}
                        />
                        {statusMapping[statusKey]}
                    </label>
                ))}
            </div>
            <div className="my-order">
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Trạng thái</th>
                            <th>Sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.reverse().map(order => {
                            // Tính tổng giá tiền cho đơn hàng
                            const totalAmount = order.items.reduce((total, item) => total + item.qty * item.price, 0);

                            return (
                                <tr key={order._id} >
                                    <td className="oid_row">{order._id}</td>
                                    <td>
                                        {order.status === 'Not_proccessed' && 'Chờ xác nhận'}
                                        {order.status === 'Processing' && 'Đang xử lý'}
                                        {order.status === 'Shipped' && 'Đang giao'}
                                        {order.status === 'Delivered' && 'Giao thành công'}
                                        {order.status === 'Cancelled' && 'Đã hủy'}
                                    </td>
                                    <td>
                                        <ul>
                                            {order.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    <img src={item.image} /> - {item.name} {'('}{item.qty}{')'}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="oid_row">{totalAmount} VND - {order.paymentMethod}</td> {/* Hiển thị tổng giá tiền */}
                                    <td>
                                        <NavLink to={`/chi-tiet-don-hang/${order._id}`}>
                                            <button>Xem</button>
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