import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {Form} from 'react-bootstrap';

import './Item.css';

const Item = props => {
  return (
    <div className='product-item'>
        <Form.Check className='custom__check-box' name='item' aria-label='option'/>
        <div className='product-item__img'>
            <img src="https://cdn.tgdd.vn/Products/Images/58/312263/cap-type-c-lightning-mfi-0-9m-anker-322-a81b5-1-2.jpg" alt="product" />
        </div>
        <div className='product-item__info'>
            <div className='product-item__info-top'>
                <div className='product-name'>
                    <a href={`/chi-tiet-san-pham/${props.id}`}>{props.name}</a>
                </div>
                <div className='group-price'>
                    <span className='sell-price'>{props.price}</span>
                    <span className='origin-price'>9.900.000đ</span>
                </div> 
            </div>
            <div className='product-item__info-bottom'>
                <div className='quantity-group-btn'>
                    <div className='minus-btn'>&#45;</div>
                    <div className='qty'>{props.qty}</div>
                    <div className='plus-btn visible'>&#43;</div>
                </div>
                <button className='delete-btn'>
                    <FontAwesomeIcon className='icon-trash-can' icon={faTrashCan}/>
                    Xóa</button>
            </div>
        </div>
    </div>
  )
}

export default Item