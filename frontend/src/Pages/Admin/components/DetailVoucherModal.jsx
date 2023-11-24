import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './DetailVoucherModal.css';
import Loader from '../../../components/UIElement/Loader';
import { formatDate } from '../../../ultis/formatDate';

const DetailVoucherModal = props => {
    const [isOpenModal, setIsOpenModal]= useState(false);
    const [voucher, setVoucher]= useState();
    const closeModalHandler= ()=> {
        setIsOpenModal(false);
    }

    const openModalHandler= ()=> {
        setIsOpenModal(true);
    }

    useEffect(()=> {
        const getVoucher= async (req, res)=> {
            await axios.get(`http://localhost:5000/voucher/get-voucher/${props.voucherId}`)
            .then(res=> {
                setVoucher(res.data);
            })
            .catch(err=> console.log(err))
        };
        getVoucher();
    }, [])
    return (
        <div>
            <div className="button-product-content">
                <button className="detail-button" onClick={openModalHandler}>Chi tiết</button>
            </div>
            <Modal dialogClassName='modal-custom' show={isOpenModal} onHide={closeModalHandler}>
                
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết khuyến mãi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {voucher ? (
                        <table className='detail-voucher__table'>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td className='voucher-title'>ID</td>
                                <td>{voucher._id}</td>
                            </tr>
                            <tr>
                                <td className='voucher-title'>Link trên web</td>
                                <td>
                                    <Link to={`/khuyen-mai/${voucher._id}`}>Xem tại đây</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className='voucher-title'>Tên chương trình</td>
                                <td>{voucher.name}</td>
                            </tr>
                            <tr>
                                <td className='voucher-title'>Phần trăm</td>
                                <td>{voucher.percent}</td>
                            </tr>
                            <tr>
                                <td className='voucher-title'>Ảnh đại diện</td>
                                <td>
                                    <img className='voucher_image' src={`http://localhost:5000/images/vouchers/${voucher.image}`} alt="khuyen-mai" />
                                </td>
                            </tr>
                            <tr>
                                <td className='voucher-title'>Mô tả</td>
                                <td>{voucher.desc}</td>
                            </tr>
                            <tr>
                                <td className='voucher-title'>Ngày bắt đầu</td>
                                <td>{formatDate(voucher.start)}</td>
                            </tr>
                            <tr>
                                <td className='voucher-title'>Ngày kết thúc</td>
                                <td>{formatDate(voucher.end)}</td>
                            </tr>
                        </table>
                        
                    ) : (<Loader/>)}
                    
                </Modal.Body>
            </Modal>
        </div>
  )
}

export default DetailVoucherModal