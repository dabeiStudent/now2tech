import React from 'react';

import './RatingList.css';
import RatingItem from './RatingItem';

const RatingList = () => {
  return (
    <ul className='rating-list'>
      <RatingItem/>
      <RatingItem/>
    </ul>
  )
}

export default RatingList