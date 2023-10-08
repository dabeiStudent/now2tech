import React from 'react';

import './RatingComponent.css';
import StarRating from './StarRating';
import RatingList from './RatingList';

const RatingComponent = () => {
  return (
    <div className='rating-container'>
        <h2>Đánh giá sản phẩm</h2>
        <div className='box-star'>
            <span className='avg-rating'>4.5</span>
            <StarRating/>
            <span className='rating-number'>10 đánh giá</span>
        </div>
        <RatingList/>        
    </div>
  )
}

export default RatingComponent