import React from 'react';
import {Link} from 'react-router-dom';

import './VoucherCard.css';

const VoucherCard = props => {
  return (
    // <li className='voucher-card' key={props.id}>
    //     <Link to={`/khuyen-mai/${props.id}`}>
    //         <img className='voucher-card__image' src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/100x100-102x100.png' alt='voucher'/>
    //         <span>{props.name}</span>
    //     </Link>   
    // </li>
    <div className='voucher-card' id={props.id}>
      <img src="https://www.ceohead.com/Resource/Blogs/Thumbnails/21/2823/sale-la-gi-ky-nang-mot-nhan-vien-sale-chuyen-nghiep-can-phai-co--2823.jpg" alt="voucher" />
      <div className='voucher-card-body'>
        <p>{props.name}</p>
      </div>
      <button className='voucher-card__btn'>Xem chi tiết</button>
    </div>
  )
}

export default VoucherCard;
