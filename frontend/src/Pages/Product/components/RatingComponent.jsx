import React from 'react';

import './RatingComponent.css';
import StarRating from './StarRating';
import RatingList from './RatingList';
import { formatNum } from '../../../ultis/formatNum';

const RatingComponent = props => {
  return (
    <div className='rating-container'>
        <h2>Đánh giá sản phẩm</h2>
        <div className='box-star'>
            <span className='avg-rating'>{formatNum(props.avgRating)}</span>
            <StarRating rating={props.avgRating}/>
            <span className='rating-number'>{props.numOfReview} đánh giá</span>
        </div>
        <RatingList reviews={props.reviews}/>        
    </div>
  )
}

export default RatingComponent