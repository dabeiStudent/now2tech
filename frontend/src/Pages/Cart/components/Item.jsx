import React, { useContext, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashCan, faTag } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';

import './Item.css';
import { CartContext } from '../../../ultis/cartContext';
import { formatPrice } from '../../../ultis/formatPrice';

const Item = props => {
    const cart= useContext(CartContext);

    const reduceQtyHandler=()=> {
        cart.reduceQty(props.id);        
    };

    const increaseQtyHandler= ()=> {
        cart.increaseQty(props.id);
    };

    const deleteItemHandler= ()=> {
        cart.deleteItem(props.id);
    }


    return (
        <div className='product-item'>
            <div className='product-item__img'>
                <img src={`http://localhost:5000/images/${props.image}`} alt="product" />
            </div>
            <div className='product-item__info'>
                <div className='product-item__info-top'>
                    <div className='product-name'>
                        <a href={`/chi-tiet-san-pham/${props.id}`}>{props.name}</a>
                        {props.voucher && props.discountValid && (
                            <span className='discount'>
                                <FontAwesomeIcon className='tag-icon' icon={faTag}/>
                                <a href={`/khuyen-mai/${props.voucher._id}`}>Giảm giá {props.discountPercent}</a>
                            </span>
                        )}
                    </div>
                    {(props.voucher && props.discountValid) ? (
                        <div className='group-price'>
                            <span className='sell-price'>{formatPrice(props.price)}</span>
                            <span className='origin-price'>{formatPrice(props.sellPrice)}</span>
                        </div> 
                    ) : (
                        <div className='group-price'>
                            <span className='sell-price'>{formatPrice(props.price)}</span>
                        </div> 
                    )}
                    
                </div>
                <div className='product-item__info-bottom'>
                    <div className='quantity-group-btn'>
                        {props.qty > 1 ? (
                            <div className='minus-btn visible' onClick={reduceQtyHandler} >&#45;</div>
                        ) : (
                            <div className='minus-btn'>&#45;</div>
                        )}
                        <div className='qty'>{props.qty}</div>
                        <div className='plus-btn visible' onClick={increaseQtyHandler}>&#43;</div>
                    </div>
                    <button className='delete-btn' onClick={deleteItemHandler}>
                        <FontAwesomeIcon className='icon-trash-can' icon={faTrashCan}/>
                        Xóa</button>
                </div>
            </div>
        </div>
  )
}

export default Item