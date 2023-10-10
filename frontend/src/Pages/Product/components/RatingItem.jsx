import React from 'react';

import './RatingItem.css';
import StarRating from './StarRating';

const RatingItem = () => {
  return (
    <li className='rating-item'>
      <div className='rating-item__top'>
        <span className='rating-item__username'>Nguyen Vinh Thien</span>
        <StarRating/>
      </div>
      <div className='rating-item__body'>
        <span>Máy nói chung ok có cái để qua đêm pim tụt khiếp quá . Chắc có bản update sau sẽ ok hơn nhung ma cung kha on tom lai nhu v cung okie</span>
      </div>
    </li>
  )
}

export default RatingItem