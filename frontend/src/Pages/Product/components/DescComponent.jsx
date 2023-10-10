import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';

import './DescComponent.css';

const DescComponent = props => {
    const [isShow, setShow]= useState(false);

    const handleShow= () => setShow(true);

    const handleClose= () => setShow(false);

    return (
        <div className='desc-container'>
            <h2>Thông tin sản phẩm</h2>
            <div className='desc-container__details'>
                <div className='desc-container__short-content'>{props.desc}</div>
                <div className='desc-container__bg'></div> 
                <div className='desc-containter__btn'>
                    <button onClick={handleShow}>Xem chi tiết...</button> 
                </div>      
            </div>
            <Modal
                dialogClassName='custom-modal'
                scrollable 
                size='lg'
                centered 
                show={isShow} 
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Thông tin sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.desc}</Modal.Body>
            </Modal>
        </div>
    )
}

export default DescComponent
