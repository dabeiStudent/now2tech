import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './VouchersContent.css';
import Loader from '../../../components/UIElement/Loader';
import { formatDate } from '../../../ultis/formatDate';
import AddVoucherModal from './AddVoucherModal';

const VouchersContent = () => {
    const [vouchers, setVouchers]= useState([]);
    const [isAddVoucher, setIsAddVoucher]= useState(false);

    useEffect(()=> {
        const getVouchers= async ()=>{
            await axios.get('http://localhost:5000/voucher/get-all-voucher', { withCredentials: true })
            .then(res=> setVouchers(res.data))
            .catch(err=> console.log(err))
        }
        getVouchers();
    }, []);

    const closeAddVoucherHandler= ()=> {
        setIsAddVoucher(false);
    }

    const openAddVoucherHandler= ()=> {
        setIsAddVoucher(true);
    }

    return (
        <React.Fragment>
            {vouchers ? (
                <div className="product-content">
                    <AddVoucherModal isAddVoucher={isAddVoucher} onClose={()=> closeAddVoucherHandler}/>
                    <div className="button-product-content">
                        <button onClick={openAddVoucherHandler} className="add-product-button">Tạo khuyến mãi</button>
                    </div>
                    <div className="table-container">
                        <table className="product-table">
                            <thead>
                                <tr >
                                    <th>Id</th>
                                    <th>Tên chương trình</th>
                                    <th>Phần trăm</th>
                                    <th>Mô tả</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Ảnh</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vouchers.map(voucher=> 
                                    <tr className="product-row">
                                        <td className="product-cell">{voucher._id}</td>
                                        <td className="product-cell">{voucher.name}</td>
                                        <td className="product-cell">{voucher.percent}</td>
                                        <td className="product-cell">{voucher.desc}</td>
                                        <td className="product-cell">{formatDate(voucher.start)}</td>
                                        <td className="product-cell">{formatDate(voucher.end)}</td>
                                        <td className="product-cell">
                                            <img src='#' />
                                        </td>
                                        <td className="product-cell">
                                            <button className="detail-button" >Chi tiết</button>
                                            <button className="upload-button" >Danh sách KM</button>
                                            <button className="edit-button" >Cập nhật</button>
                                            <button className="remove-button" >Xóa</button>                                        
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : ( <Loader/> )}
        </React.Fragment>
    )
}

export default VouchersContent