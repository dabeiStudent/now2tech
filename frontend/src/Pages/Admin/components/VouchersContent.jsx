import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './VouchersContent.css';
import Loader from '../../../components/UIElement/Loader';
import { formatDate } from '../../../ultis/formatDate';
import AddVoucherModal from './AddVoucherModal';
import DetailVoucherModal from './DetailVoucherModal';
import UpdateVoucherModal from './UpdateVoucherModal';
import AddProductDiscount from './AddProductDiscount';

const VouchersContent = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isReload, setIsReload] = useState(false);
    const [showExpired, setShowExpired] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getVouchers = async () => {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/voucher/get-all-voucher`, { withCredentials: true })
                .then(res => setVouchers(res.data))
                .catch(err => console.log(err))
        }
        getVouchers();
    }, [isReload]);

    const deleteVoucherHandler = async (voucherId) => {
        const confirmed = window.confirm('Bạn muốn xóa khuyến mãi này?');

        if (confirmed) {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/voucher/delete-voucher/${voucherId}`, { withCredentials: true })
                .then(res => {
                    toast(res.data.msg);
                    setIsReload(!isReload);
                })
                .catch(err => toast('Đã xảy ra lỗi. Thử lại sau'))
        }
    }

    const isSuccess = () => {
        setIsReload(!isReload);
    }
    const sendEmailToUsers = (voucherId) => {
        if (window.confirm('Bạn muốn thông báo tới tất cả user?')) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/voucher/notice-voucher-to-all`, { vid: voucherId }, { withCredentials: true })
                .then(result => {
                    toast('Đã thông báo tới user');
                })
                .catch(err => {
                    toast('Có lỗi');
                    console.log(err);
                })
        }
    }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const filteredVouchers = showExpired
        ? vouchers.filter(voucher => new Date(voucher.end) <= new Date())
        : vouchers.filter(voucher => new Date(voucher.end) > new Date());
    const searchVoucher = vouchers.filter((voucher) => {
        return (
            voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            voucher._id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    })
    const resetDiscount = () => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/voucher/reset-all-discount`, { vouchers }, { withCredentials: true })
            .then(result => {
                toast("Đã reset lại các sản phẩm");
            })
            .catch(err => {
                toast(err.message);
            })
    }
    return (
        <React.Fragment>
            {vouchers ? (
                <div className="product-content">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Tìm tên/mã chương trình"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className='top-voucher-page'>
                        <AddVoucherModal addSuccess={() => isSuccess()} />
                        <button onClick={resetDiscount} className="add-product-button">Ngưng áp dụng các chương trình hết hạn</button>
                    </div>
                    <div className='filter-checkbox-voucher'>
                        <input
                            id="checkbox"
                            type="checkbox"
                            onChange={() => setShowExpired(!showExpired)}
                        />
                        <label htmlFor='checkbox'>Các chương trình khuyến mãi đã tới hạn</label>
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
                                {searchTerm == ""
                                    ? <React.Fragment>
                                        {filteredVouchers.map(voucher =>
                                            <tr key={voucher._id} className="product-row">
                                                <td className="product-cell">{voucher._id}</td>
                                                <td className="product-cell">{voucher.name}</td>
                                                <td className="product-cell">{voucher.percent}</td>
                                                <td className="product-cell">{voucher.desc}</td>
                                                <td className="product-cell">{formatDate(voucher.start)}</td>
                                                <td className="product-cell">{formatDate(voucher.end)}</td>
                                                <td className="product-cell">
                                                    <img src={voucher.image} alt='voucher-banner' />
                                                </td>
                                                <td className="product-cell">
                                                    <div className='voucher-btn'>
                                                        <DetailVoucherModal voucherId={voucher._id} />
                                                        <UpdateVoucherModal isSuccess={() => isSuccess()} voucherId={voucher._id} />
                                                        <AddProductDiscount voucherId={voucher._id} />
                                                        <button className='upload-button' onClick={() => sendEmailToUsers(voucher._id)}>Gửi thông báo</button>
                                                        <button className="block-button" onClick={() => deleteVoucherHandler(voucher._id)}>Xóa</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                    : <React.Fragment>
                                        {searchVoucher.map(voucher =>
                                            <tr key={voucher._id} className="product-row">
                                                <td className="product-cell">{voucher._id}</td>
                                                <td className="product-cell">{voucher.name}</td>
                                                <td className="product-cell">{voucher.percent}</td>
                                                <td className="product-cell">{voucher.desc}</td>
                                                <td className="product-cell">{formatDate(voucher.start)}</td>
                                                <td className="product-cell">{formatDate(voucher.end)}</td>
                                                <td className="product-cell">
                                                    <img src={voucher.image} alt='voucher-banner' />
                                                </td>
                                                <td className="product-cell">
                                                    <div className='voucher-btn'>
                                                        <DetailVoucherModal voucherId={voucher._id} />
                                                        <UpdateVoucherModal isSuccess={() => isSuccess()} voucherId={voucher._id} />
                                                        <AddProductDiscount voucherId={voucher._id} />
                                                        <button className='upload-button' onClick={() => sendEmailToUsers(voucher._id)}>Gửi thông báo</button>
                                                        <button className="block-button" onClick={() => deleteVoucherHandler(voucher._id)}>Xóa</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (<Loader />)}
        </React.Fragment>
    )
}

export default VouchersContent