import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

import './VNPayPayment.css';

const VNPayPayment = () => {
    const {oid}= useParams();
    const [searchParams]= useSearchParams();
    const [data, setData]= useState();

    // const vnpayParams= Object.fromEntries(searchParams);

    useEffect(()=> {
        const paymentResult= async ()=> {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/vnpay-ipn/${oid}`, {params: Object.fromEntries(searchParams)})
            .then(res => setData(res.data))
            .catch(err=> console.log(err))
        }
        paymentResult();
    }, [oid, searchParams]);

    console.log(data)



    return (
        <div className='payment-result-page'>
            {(data && data.RspCode === '00') ? (
                <div className='center-container success'>
                    <FontAwesomeIcon className='checked-icon' icon={faCircleCheck}/>
                    <h1>Successful</h1>
                    <span>Thanh toán thành công</span><a href={`/chi-tiet-don-hang/${oid}`}>Xem chi tiết đơn hàng</a>
                </div>
            ) : (
                <div className='center-container failed'>
                    <FontAwesomeIcon className='xmark-icon' icon={faCircleXmark}/>
                    <h1>Failed</h1>
                    <span>Thanh toán thất bại! Thử lại sau</span><a href={`/chi-tiet-don-hang/${oid}`}>Xem chi tiết đơn hàng</a>
                </div>
            )}     
            
        </div>
    )
}

export default VNPayPayment