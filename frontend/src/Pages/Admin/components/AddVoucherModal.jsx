import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddVoucherModal = props => {
  return (
    <Modal dialogClassName='modal-custom' show={props.isAddVoucher} onHide={props.onClose()}>
        <Modal.Header closeButton>
            <Modal.Title>Thêm khuyến mãi</Modal.Title>
        </Modal.Header>
        <Form >
            <Modal.Body>
                {/* <div className='review-item'>
                    <div className='review-item__img'>
                        <img src="https://cdn.tgdd.vn/Products/Images/58/312263/cap-type-c-lightning-mfi-0-9m-anker-322-a81b5-1-2.jpg" alt="product" />
                    </div>
                    <div className='review-item__name'><p>{props.name}</p></div>
                    <div className='review-item__rating'>
                        <div className='star-rating'>
                            <span onClick={()=> setUserRating(1)}>
                                {rating >= 1 ? <FontAwesomeIcon className='icon-star' icon={solidStart}/> : rating >= 0.5 ? <FontAwesomeIcon className='icon-star' icon={faStarHalfStroke}/> : <FontAwesomeIcon className='icon-star' icon={regularStart}/> }
                            </span>
                            <span onClick={()=> setUserRating(2)}>
                                {rating >= 2 ? <FontAwesomeIcon className='icon-star' icon={solidStart}/> : rating >= 1.5 ? <FontAwesomeIcon className='icon-star' icon={faStarHalfStroke}/> : <FontAwesomeIcon className='icon-star' icon={regularStart}/> }
                            </span>
                            <span onClick={()=> setUserRating(3)}>
                                {rating >= 3 ? <FontAwesomeIcon className='icon-star' icon={solidStart}/> : rating >= 2.5 ? <FontAwesomeIcon className='icon-start' icon={faStarHalfStroke}/> : <FontAwesomeIcon className='icon-star' icon={regularStart}/> }
                            </span>
                            <span onClick={()=> setUserRating(4)}>
                                {rating >= 4 ? <FontAwesomeIcon className='icon-star' icon={solidStart}/> : rating >= 3.5 ? <FontAwesomeIcon className='icon-star' icon={faStarHalfStroke}/> : <FontAwesomeIcon className='icon-star' icon={regularStart}/> }
                            </span>
                            <span onClick={()=> setUserRating(5)}>
                                {rating >= 5 ? <FontAwesomeIcon className='icon-star' icon={solidStart}/> : rating >= 4.5 ? <FontAwesomeIcon className='icon-star' icon={faStarHalfStroke}/> : <FontAwesomeIcon className='icon-star' icon={regularStart}/> }
                            </span>
                        </div>
                    </div>
                    <div className='review-item__comment'>
                        <label htmlFor="comment">Viết bình luận:</label>
                        <textarea value={comment} onChange={commentChangeHandler} id='comment' rows={3} placeholder='Bình luận của bạn...'/>
                    </div>
                </div>                      */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary'type='submit' >Thêm</Button>
            </Modal.Footer>
        </Form>
    </Modal>
  
  )
}

export default AddVoucherModal