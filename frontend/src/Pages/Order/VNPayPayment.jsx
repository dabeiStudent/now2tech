import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'


import './VNPayPayment.css';

const VNPayPayment = () => {
    const {oid}= useParams();
    const searchParams= useSearchParams();
    const [data, setData]= useState();

    const vnpayParams= Object.fromEntries(searchParams);

    console.log(vnpayParams);

    useEffect(()=> {
        const paymentResult= async ()=> {
            await axios.get(`http://localhost:5000/order/vnpay-ipn/${oid}`, {params: {vnpayParams}})
            .then(res => setData(res.data))
            .catch(err=> console.log(err))
        }
        paymentResult();
    }, [data, oid, vnpayParams])

    return (
        <div className='payment-result-page'>
            <div className='center-container'>
                <FontAwesomeIcon className='checked-icon' icon={faCircleCheck}/>
                <h1>Successfull</h1>
                <span>Bạn đã thanh toán thành công</span><a href={`/chi-tiet-don-hang/${oid}`}>Xem chi tiết đơn hàng</a>
            </div>
            
            
        </div>
    )
}

export default VNPayPayment