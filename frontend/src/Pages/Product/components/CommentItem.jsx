import React from 'react';

import './CommentItem.css';

const CommentItem = () => {
  return (
    <div className='comment-item'>
      <li className='comment-item__question'>
        <div className='comment-item__top'>
          <span className='comment-item__username'>username</span>
        </div>
        <div className='comment-item__body'>
          <span>Please enter your question.</span>
        </div>
      </li>
      <li className='comment-item__reply'>
        <div className='comment-item__top'>
          <span className='comment-item__username'>usermane</span>
        </div>
        <div>
          <span>An answer for this question</span>
        </div>
      </li>
    </div>
    
  )
}

export default CommentItem