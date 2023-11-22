import React from 'react';
import {useNavigate} from 'react-router-dom';

import './VoucherCard.css';

const VoucherCard = props => {
  const navigate= useNavigate();

  const seeDetailsHandler= ()=>{
    navigate(`/khuyen-mai/${props.id}`)
  }
  return (
    <div className='voucher-card' id={props.id}>
      <img src={`http://localhost:5000/images/vouchers/${props.image}`} alt="voucher" />
      <div className='voucher-card-body'>
        <p>{props.name}</p>
      </div>
      <button onClick={seeDetailsHandler} className='voucher-card__btn'>Xem chi tiết</button>
    </div>
  )
}

export default VoucherCard;
