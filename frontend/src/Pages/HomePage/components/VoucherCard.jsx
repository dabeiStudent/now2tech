import React from 'react';
import {Link} from 'react-router-dom';

import './VoucherCard.css';

const VoucherCard = props => {
  return (
    <li className='voucher-card' key={props.id}>
        <Link to="/voucher/chi-tiet">
            <img className='voucher-card__image' src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/100x100-102x100.png' alt='voucher'/>
            <span>{props.name}</span>
        </Link>   
    </li>
  )
}

export default VoucherCard;
