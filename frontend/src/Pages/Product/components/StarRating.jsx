import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faStar as solidStart } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStart} from '@fortawesome/free-regular-svg-icons';

import './StarRating.css';

const StarRating = props => {
  let rating= props.rating;
  return (
    <div className='star-rating'>
      <span>
        {rating >= 1 ? <FontAwesomeIcon className='icon-star' icon={solidStart}/> : rating >= 0.5 ? <FontAwesomeIcon className='icon-star' icon={faStarHalfStroke}/> : <FontAwesomeIcon className='icon-star' icon={regularStart}/> }
      </span>
      <span>
        {rating >= 2 ? <FontAwesomeIcon className='icon-star' icon={solidStart}/> : rating >= 1.5 ? <FontAwesomeIcon className='icon-star' icon={faStarHalfStroke}/> : <FontAwesomeIcon className='icon-star' icon={regularStart}/> }
      </span>
      <span>
        {rating >= 3 ? <FontAwesomeIcon className='icon-star' icon={solidStart}/> : rating >= 2.5 ? <FontAwesomeIcon className='icon-start' icon={faStarHalfStroke}/> : <FontAwesomeIcon className='icon-star' icon={regularStart}/> }
      </span>
      <span>
        {rating >= 4 ? <FontAwesomeIcon className='icon-star' icon={solidStart}/> : rating >= 3.5 ? <FontAwesomeIcon className='icon-star' icon={faStarHalfStroke}/> : <FontAwesomeIcon className='icon-star' icon={regularStart}/> }
      </span>
      <span>
        {rating >= 5 ? <FontAwesomeIcon className='icon-star' icon={solidStart}/> : rating >= 4.5 ? <FontAwesomeIcon className='icon-star' icon={faStarHalfStroke}/> : <FontAwesomeIcon className='icon-star' icon={regularStart}/> }
      </span>
    </div>
  )
}

export default StarRating;