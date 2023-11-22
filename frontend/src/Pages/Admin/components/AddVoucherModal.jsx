import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import './AddVoucherModal.css';

const AddVoucherModal = props => {
    const [isOpenModal, setIsOpenModal]= useState(false);
    const [imgFile, setImgFile]= useState();
    const [previewUrl, setPreviewUrl]= useState(); 
    const [voucherInfo, setVoucherInfo]= useState({
        name: '',
        desc: '',
        percent: '',
        start: '',
        end: '',
        image: imgFile
    });
    
    const changeVoucherInfoHandler= (e)=> {
        const { name, value }= e.target;
        setVoucherInfo({...voucherInfo, [name]: value })
    }

    const closeModalHandler= ()=> {
        setIsOpenModal(false);
    }

    const openModalHandler= ()=> {
        setIsOpenModal(true);
    }

    const addVoucherHandler= async (e)=>{
        e.preventDefault();

        if(voucherInfo.name === '' ||
            voucherInfo.desc === ''||
            voucherInfo.percent === '' ||
            voucherInfo.start === '' ||
            voucherInfo.end === ''
        ){
            return toast("Nhập đầy đủ thông tin để thêm.")
        }

        const formData= new FormData();
        formData.append('name', voucherInfo.name);
        formData.append('desc', voucherInfo.desc);
        formData.append('percent', voucherInfo.percent);
        formData.append('startDate', voucherInfo.start);
        formData.append('endDate', voucherInfo.end);
        formData.append('file', imgFile);

        await axios.post('http://localhost:5000/voucher/add-new-voucher', formData, { withCredentials: true, headers: { "Content-Type": 'multipart/form-data'} })
        .then(res=> {
            setVoucherInfo({
                name: '',
                percent: '',
                desc: '',
                end: '',
                start: ''
            })
            closeModalHandler();
            props.addSuccess();
        })
        .catch(err => toast('Đã xảy ra lỗi. Thử lại sau'))
        
    }
    

    useEffect(()=> {
        if(!imgFile){
            return
        }
        const fileReader= new FileReader();
        fileReader.onload= ()=> {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(imgFile);
        
    }, [imgFile])

    const imgChangeHandler= (e)=> {
        if(e.target.files && e.target.files.length === 1){
            setImgFile(e.target.files[0]);
        }
    };


    return (
        <div>
            <div className="button-product-content">
                <button className="add-product-button" onClick={openModalHandler}>Tạo khuyến mãi</button>
            </div>
            <ToastContainer/>
            <Modal dialogClassName='modal-custom' show={isOpenModal} onHide={closeModalHandler}>
                
                <Modal.Header closeButton>
                    <Modal.Title>Thêm khuyến mãi</Modal.Title>
                </Modal.Header>
                <Form onSubmit={addVoucherHandler}>
                    <Modal.Body>
                        <div className='voucher_row'>
                            <label htmlFor="name">Tên chương trình</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                value={voucherInfo.name}
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
                                value={voucherInfo.percent}
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
                                value={voucherInfo.desc}
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
                                value={voucherInfo.start}
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
                                value={voucherInfo.end}
                                onChange={changeVoucherInfoHandler}
                                required
                            />
                        </div>
                        <div className='voucher_row'>
                            <label htmlFor="image">Ảnh</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={imgChangeHandler}
                                required
                            />
                        </div>
                        <div className='voucher_row'>
                            <div className='preview-container'>
                                {previewUrl && <img src={previewUrl} alt="preview" />}
                                {!previewUrl && <p>Chưa có ảnh nào!</p>}
                            </div>
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary'type='submit'>Thêm</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default AddVoucherModal