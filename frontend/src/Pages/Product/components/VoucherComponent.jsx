import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faTag } from '@fortawesome/free-solid-svg-icons';

import './VoucherComponent.css';

const VoucherComponent = props => {
    return (
        <div className='product-page__voucher-list'>
            <div className='vouchers__title'>
                <FontAwesomeIcon className='product-page__icon' icon={faGift} />
                <p>KHUYẾN MÃI</p>
            </div>
            <ul className='vouchers__list'>
                {props.vouchers && (
                    <li className='vouchers__items'>
                        <FontAwesomeIcon className='product-page__icon red-icon' icon={faTag} />
                        <Link to={`/khuyen-mai/${props.vouchers._id}`}>{props.vouchers.name}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default VoucherComponent;