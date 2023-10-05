import axios from "axios";
import React, { useEffect } from "react";

const OrderMenu = () => {
    const userLoggedIn = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        axios.get('http://localhost:5000/order/my-order', { withCredentials: true })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }, [userLoggedIn.userName]);
    return (
        <h2>OrderMenu</h2>
    )
}

export default OrderMenu;