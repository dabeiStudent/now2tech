import React from 'react';

import './RatingList.css';
import RatingItem from './RatingItem';

const RatingList = props => {
  return (
    <ul className='rating-list'>
      {props.reviews.map(review=> (
        <RatingItem key={review._id} userName={review.userName} comment={review.comment} rating={review.rating}/>
      ))}
      
      
    </ul>
  )
}

export default RatingList