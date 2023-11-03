import React from 'react';

import './CommentList.css';
import CommentItem from './CommentItem';

const CommentList = props => {
  return (
    <ul className='comment-list'>
      {props.comments.map(comment=> (
        <CommentItem 
          key={comment._id}
          id={comment._id}
          user={comment.user}
          content={comment.content}
          replies= {comment.replies}  
          flag= {props.flag}
          setFlag= {props.setFlag}
        />
      ))}
    </ul>
  )
}

export default CommentList