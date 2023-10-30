import React from 'react';

import './SelectedItem.css';
import { formatPrice } from '../../../ultis/formatPrice';
import { NavLink } from 'react-router-dom';

const OrderItem = props => {  

    return (
        <li className='selected-item__container'>
            <div className='selected-item'>
                <div className='selected-item__img'>
                    <img src="https://cdn.tgdd.vn/Products/Images/58/312263/cap-type-c-lightning-mfi-0-9m-anker-322-a81b5-1-2.jpg" alt="product" />
                </div>
                <div className='selected-item__info'>
                    <div className='selected-item__info-left'>
                        <NavLink to={`/chi-tiet-san-pham/${props.id}`}>{props.name}</NavLink>
                        <div className='selected-item__qty'>
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
        </li>
    )
}

export default OrderItem