import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import './AddVoucherModal.css';

const AddVoucherModal = props => {
  return (
    <Modal dialogClassName='modal-custom' show={props.isAddVoucher} onHide={props.onClose()}>
        <Modal.Header closeButton>
            <Modal.Title>Thêm khuyến mãi</Modal.Title>
        </Modal.Header>
        <Form >
            <Modal.Body>
                <div className='voucher_row'>
                    <label htmlFor="name">Tên chương trình</label>
                    <input
                        type="text"
                        id='name'
                        name='name'
                        required
                    />
                </div>
                <div className='voucher_row'>
                    <label htmlFor="percent">Phần trăm</label>
                    <input
                        type="number"
                        id="percent"
                        name="percent"
                        required
                    />
                </div>
                <div className='voucher_row'>
                    <label htmlFor="description">Mô tả</label>
                    <textarea
                        id='description'
                        name='description'
                        rows={4}
                        required
                    />
                </div>
                <div className='voucher_row'>
                    <label htmlFor="release">Ngày bắt đầu</label>
                    <input
                        type="date"
                        id="start"
                        name="start"
                        required
                    />
                </div>
                <div className='voucher_row'>
                    <label htmlFor="end">Ngày kết thúc</label>
                    <input
                        type="date"
                        id="end"
                        name="end"
                        required
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary'type='submit' >Thêm</Button>
            </Modal.Footer>
        </Form>
    </Modal>
  
  )
}

export default AddVoucherModal