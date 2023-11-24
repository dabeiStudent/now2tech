import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './VouchersContent.css';
import Loader from '../../../components/UIElement/Loader';
import { formatDate } from '../../../ultis/formatDate';
import AddVoucherModal from './AddVoucherModal';
import DetailVoucherModal from './DetailVoucherModal';
import UpdateVoucherModal from './UpdateVoucherModal';

const VouchersContent = () => {
    const [vouchers, setVouchers]= useState([]);
    const [isReload, setIsReload]= useState(false);

    useEffect(()=> {
        const getVouchers= async ()=>{
            await axios.get('http://localhost:5000/voucher/get-all-voucher', { withCredentials: true })
            .then(res=> setVouchers(res.data))
            .catch(err=> console.log(err))
        }
        getVouchers();
    }, [isReload]);

    const deleteVoucherHandler= async(voucherId)=> {
        const confirmed= window.confirm('Bạn muốn xóa khuyến mãi này?');

        if(confirmed){
            await axios.delete(`http://localhost:5000/voucher/delete-voucher/${voucherId}`, { withCredentials: true })
            .then(res=> {
                toast(res.data.msg);
                setIsReload(!isReload);
            })
            .catch(err=> toast('Đã xảy ra lỗi. Thử lại sau'))
        }
    }

    const isSuccess= ()=> {
        setIsReload(!isReload);
    }

    return (
        <React.Fragment>
            <ToastContainer/>
            {vouchers ? (
                <div className="product-content">
                    <AddVoucherModal addSuccess={()=> isSuccess()}/>
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
                                    <tr key={voucher._id} className="product-row">
                                        <td className="product-cell">{voucher._id}</td>
                                        <td className="product-cell">{voucher.name}</td>
                                        <td className="product-cell">{voucher.percent}</td>
                                        <td className="product-cell">{voucher.desc}</td>
                                        <td className="product-cell">{formatDate(voucher.start)}</td>
                                        <td className="product-cell">{formatDate(voucher.end)}</td>
                                        <td className="product-cell">
                                            <img src={`http://localhost:5000/images/vouchers/${voucher.image}`} alt='voucher-banner'/>
                                        </td>
                                        <td className="product-cell">
                                            <DetailVoucherModal voucherId={voucher._id}/>
                                            <UpdateVoucherModal isSuccess={()=> isSuccess()} voucherId={voucher._id}/>
                                            <button className="edit-button" >Cập nhật</button>
                                            <button className="remove-button" onClick={()=> deleteVoucherHandler(voucher._id)}>Xóa</button>                                        
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