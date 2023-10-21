import React, { useContext } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
            {/* <Form.Check className='custom__check-box' value={props.id} name='item' aria-label='option'/> */}
            <div className='product-item__img'>
                <img src="https://cdn.tgdd.vn/Products/Images/58/312263/cap-type-c-lightning-mfi-0-9m-anker-322-a81b5-1-2.jpg" alt="product" />
            </div>
            <div className='product-item__info'>
                <div className='product-item__info-top'>
                    <div className='product-name'>
                        <a href={`/chi-tiet-san-pham/${props.id}`}>{props.name}</a>
                    </div>
                    {props.vouchers ? (
                        <div className='group-price'>
                            <span className='sell-price'>{formatPrice(props.price * (100 - props.vouchers.percent) / 100)}</span>
                            <span className='origin-price'>{formatPrice(props.price)}</span>
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