import axios from "axios";
import React, { useEffect } from "react";

const OrderMenu = () => {
    useEffect(() => {
        axios.get('http://localhost:5000/order/my-order', { withCredentials: true })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }, []);
    return (
        <h2>OrderMenu</h2>
    )
}

export default OrderMenu;