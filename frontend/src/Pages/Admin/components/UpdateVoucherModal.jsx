import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Toast } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify'

import './UpdateVoucherModal.css';
import Loader from '../../../components/UIElement/Loader';
import { YMDFormat } from '../../../ultis/formatDate';

const UpdateVoucherModal = props => {
    const [isOpenModal, setIsOpenModal]= useState(false);
    const [isChange, setIsChange]= useState(false);
    const [voucher, setVoucher]= useState();
    const [updateVoucher, setUpdateVoucher]= useState({
        name: '',
        desc: '',
        end: '',
        start: '',
        percent: ''
    });

    useEffect(()=> {
        const getVoucher= async (req, res)=> {
            await axios.get(`http://localhost:5000/voucher/get-voucher/${props.voucherId}`)
            .then(res=> {
                setVoucher(res.data);
                setUpdateVoucher({
                    name: res.data.name,
                    desc: res.data.desc,
                    end: res.data.end,
                    start: res.data.start,
                    percent: res.data.percent
                });
            })
            .catch(err=> console.log(err))
        };
        getVoucher();
    }, []);

    const changeVoucherInfoHandler= (e)=> {
        setIsChange(true);
        setUpdateVoucher({...updateVoucher, [e.target.name]: e.target.value})
    };

    const closeModalHandler= ()=> {
        setUpdateVoucher({
            name: voucher.name,
            desc: voucher.desc,
            end: voucher.end,
            start: voucher.start,
            percent: voucher.percent
        });
        setIsChange(false);
        setIsOpenModal(false);
    }

    const openModalHandler= ()=> {
        setIsOpenModal(true);
    }

    const updateVoucherHandler= (e)=> {
        e.preventDefault();
        const updateVoucherReq= async() => {
            await axios.put(`http://localhost:5000/voucher/update-voucher/${props.voucherId}`, {
               name: updateVoucher.name,
               desc: updateVoucher.desc,
               percent: updateVoucher.percent,
               startDate: updateVoucher.start,
               endDate: updateVoucher.end
            }, { withCredentials: true })
            .then(res=> {
                closeModalHandler();
                toast('Cập nhật thành công');
                props.isSuccess();
            })
            .catch(err=> console.log(err))
        }
        if(isChange){
            updateVoucherReq();
        }
    }

    return (
        <div>
            <div className="button-product-content">
                <button className="edit-button" onClick={openModalHandler}>Cập nhật</button>
            </div>
            <Modal dialogClassName='modal-custom' show={isOpenModal} onHide={closeModalHandler}>
                
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật khuyến mãi</Modal.Title>
                </Modal.Header>
                {voucher ? (
                    <Form onSubmit={updateVoucherHandler}>
                        <Modal.Body>
                            <div className='voucher_row'>
                                <label htmlFor="name">Tên chương trình</label>
                                <input
                                    type="text"
                                    id='name'
                                    name='name'
                                    value={updateVoucher.name}
                                    onChange={changeVoucherInfoHandler}
                                    required
                                />
                            </div>
                            <div className='voucher_row'>
                                <label htmlFor="percent">Phần trăm</label>
                                <input
                                    type="number"
                                    id="percent"
                                    name="percent"
                                    value={updateVoucher.percent}
                                    onChange={changeVoucherInfoHandler}
                                    required
                                />
                            </div>
                            <div className='voucher_row'>
                                <label htmlFor="desc">Mô tả</label>
                                <textarea
                                    id='desc'
                                    name='desc'
                                    rows={4}
                                    value={updateVoucher.desc}
                                    onChange={changeVoucherInfoHandler}
                                    required
                                />
                            </div>
                            <div className='voucher_row'>
                                <label htmlFor="start">Ngày bắt đầu</label>
                                <input
                                    type="date"
                                    id="start"
                                    name="start"
                                    value={YMDFormat(updateVoucher.start)}
                                    onChange={changeVoucherInfoHandler}
                                    required
                                />
                            </div>
                            <div className='voucher_row'>
                                <label htmlFor="end">Ngày kết thúc</label>
                                <input
                                    type="date"
                                    id="end"
                                    name="end"
                                    value={YMDFormat(updateVoucher.end)}
                                    onChange={changeVoucherInfoHandler}
                                    required
                                />
                            </div>                       
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='danger' onClick={closeModalHandler}>Hủy</Button>
                            {isChange ? (
                                <Button variant='primary'type='submit'>Cập nhật</Button>
                            ) : (
                                <Button disabled variant='primary'type='submit'>Cập nhật</Button>
                            )}                        
                        </Modal.Footer>
                    </Form>
                ) : (
                    <Modal.Body>
                        <Loader/>
                    </Modal.Body>
                )}
                
            </Modal>
        </div>
    )
}

export default UpdateVoucherModal