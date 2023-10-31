import React from 'react';

import './CommentItem.css';

const CommentItem = props => {
  return (
    <div className='comment-item'>
      <li className='comment-item__question'>
        <div className='comment-item__top'>
          <span className='comment-item__username'>{props.user.name}</span>
        </div>
        <div className='comment-item__body'>
          <span>{props.content}</span>
        </div>
      </li>
      {props.replies.length !== 0 && props.replies.map(reply=> (
        <li className='comment-item__reply'>
          <div className='comment-item__top'>
            <span className='comment-item__username'>usermane</span>
          </div>
          <div>
            <span>An answer for this question</span>
          </div>
        </li>
      ))}
      
    </div>
    
  )
}

export default CommentItem