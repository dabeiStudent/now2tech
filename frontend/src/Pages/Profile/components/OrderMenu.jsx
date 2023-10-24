import axios from "axios";
import React, { useEffect, useState } from "react";

import './OrderMenu.css';
import { Button } from "bootstrap";
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
                    <th>Mã đơn</th>
                    <th>Trạng thái</th>
                    <th>Phương thức thanh toán</th>
                    <th>Sản phẩm</th>
                    <th>Action</th>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.status}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                                <ul>
                                    {order.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            {item.name} - Quantity: {item.qty} - Price: ${item.price}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <button>Chi tiết</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </React.Fragment>
    )
}

export default OrderMenu;