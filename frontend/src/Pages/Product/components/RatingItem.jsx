import React from 'react';

import './RatingItem.css';
import StarRating from './StarRating';

const RatingItem = props => {
  return (
    <li className='rating-item'>
      <div className='rating-item__top'>
        <span className='rating-item__username'>{props.userName}</span>
        <StarRating rating={props.rating}/>
      </div>
      <div className='rating-item__body'>
        <span>{props.comment}</span>
      </div>
    </li>
  )
}

export default RatingItem