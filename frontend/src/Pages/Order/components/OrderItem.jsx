import React from 'react';

import './OrderItem.css';
import { formatPrice } from '../../../ultis/formatPrice';

const OrderItem = props => {
  return (
    <li className='order-item'>
        <div className='order-item__img'>
            <img src="https://cdn.tgdd.vn/Products/Images/58/312263/cap-type-c-lightning-mfi-0-9m-anker-322-a81b5-1-2.jpg" alt="product" />
        </div>
        <div className='order-item__info'>
            <div className='order-item__info-left'>
                <a href={`/chi-tiet-san-pham/`}>{props.name}</a>
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
    </li>
  )
}

export default OrderItem