import React from 'react';

import './CommentList.css';
import CommentItem from './CommentItem';

const CommentList = () => {
  return (
    <ul className='comment-list'>
      <CommentItem/>
      {/* <CommentItem/> */}
    </ul>
  )
}

export default CommentList