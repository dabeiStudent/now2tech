import React, {useState} from 'react';

import './CommentComponent.css';
import CommentList from './CommentList';

const CommentComponent = () => {
  const [isOpen, setIsOpen]= useState(false);

  const openHandler= ()=> {setIsOpen(true)};
  return (
    <div className='comment-container'>
        <h2>Bình luận</h2>
        <form action="submit" className='comment-form'>
          <textarea onClick={openHandler} className='comment-form__textarea' rows={3} placeholder='Mời bạn đặt câu hỏi' name="comment" id="comment" ></textarea>
          { isOpen &&
            <div className='user-info'>
              <input type="text" placeholder='Họ và tên' required/>
              <input type="email" placeholder='Email' required/>
              <input type="text" placeholder='Số điện thoại' pattern="[0-9]*" />
              <button>Gửi</button>
            </div>
          }
        </form>
        <CommentList/>        
    </div>
  )
}

export default CommentComponent