import React from 'react';

import './SelectedItem.css';
import { formatPrice } from '../../../ultis/formatPrice';
import { NavLink } from 'react-router-dom';

const OrderItem = props => {

    return (
        <li className='selected-item__container'>
            <div className='selected-item'>
                <div className='selected-item__img'>
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/images/${props.image}`} alt="product" />
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
                        <span className='origin-price'>{formatPrice(props.sellPrice)}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default OrderItem