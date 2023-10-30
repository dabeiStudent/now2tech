import React, { useState, useCallback } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faStar as solidStart } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStart} from '@fortawesome/free-regular-svg-icons';

import './OrderItem.css';
import { formatPrice } from '../../../ultis/formatPrice';

const OrderItem = props => {
    const navigate= useNavigate();
    const [openModal, setOpenModal]= useState(false);
    const [comment, setComment]= useState('');
    const [rating, setRating]= useState(0);

    const openModalHandler= ()=> {
        setOpenModal(true);
    };

    const closeModalHandler= ()=> {
        setOpenModal(false);
    };

    const commentChangeHandler= (e)=> {
        setComment(e.target.value);
    };

    const setUserRating= useCallback((number)=> {
        return setRating(number);
    }, [])

    const submitReviewHandler= async (e)=>{
        e.preventDefault();

        if(rating === 0 || comment === ''){
            return window.alert("Vui chia sẻ đánh giá của bạn về sản phẩm.")
        }

        await axios.post(`http://localhost:5000/product/add-review/${props.id}`, {
            rating: rating,
            comment: comment
        }, {withCredentials: true})
        .then(res=> {
            window.alert(res.data.msg);
            navigate(0);            
        })
        .catch(err=> console.log(err)); 
    }

    return (
        <li className='order-item__container'>
            <div className='order-item'>
                <div className='order-item__img'>
                    <img src="https://cdn.tgdd.vn/Products/Images/58/312263/cap-type-c-lightning-mfi-0-9m-anker-322-a81b5-1-2.jpg" alt="product" />
                </div>
                <div className='order-item__info'>
                    <div className='order-item__info-left'>
                        <NavLink to={`/chi-tiet-san-pham/${props.id}`}>{props.name}</NavLink>
                        <div className='order-item__qty'>
                            <span>Số lượng: </span>
                            <span>{props.qty}</span>
                        </div>
                    </div>
                    <div className='group-price'>
                        <span className='sell-price'>{formatPrice(props.price)}</span>
                        <span className='origin-price'>{formatPrice(20000)}</span>
                    </div>
                </div>
            </div>
            {props.orderStatus === 'Delivered' && (
                <div>
                    <div className='order-item__review-btn'>
                        <button onClick={openModalHandler}>Viết đánh giá</button>
                    </div>
                    <Modal dialogClassName='modal-custom' show={openModal} onHide={closeModalHandler}>
                        <Modal.Header closeButton>
                            <Modal.Title>Đánh giá</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={submitReviewHandler}>
                            <Modal.Body>
                                <div className='review-item'>
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
                                        <textarea onChange={commentChangeHandler} id='comment' rows={3} placeholder='Bình luận của bạn...'/>
                                    </div>
                                </div>                     
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant='danger' onClick={closeModalHandler}>Hủy</Button>
                                <Button variant='primary'type='submit' >Cập nhật</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>

            )}
            
        </li>
    )
}

export default OrderItem