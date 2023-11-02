import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './CommentComponent.css';
import CommentList from './CommentList';

const CommentComponent = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState();
  const [comment, setComment] = useState({
    name: null,
    email: null,
    phoneNumber: null,
    content: null
  })
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const getComments = async () => {
      await axios.get(`http://localhost:5000/comment/get-comments/${props.productId}`)
        .then(res => setComments(res.data))
        .catch(err => console.log(err));
    }
    getComments();
  }, [props.productId, flag]);

  const changeCommentHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value })
  };

  const submitCommentHandler = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:5000/comment/create-comment/${props.productId}`,
      {
        name: comment.name,
        email: comment.email,
        phoneNumber: comment.phoneNumber,
        content: comment.content
      })
      .then(res => {
        setComment({
          name: '',
          email: '',
          phoneNumber: '',
          content: ''
        })
        setFlag(!flag)
      })
      .catch(err => console.log(err));
  }

  const openHandler = () => { setIsOpen(true) };
  return (
    <div className='comment-container'>
      <h2>Bình luận</h2>
      <form className='comment-form' onSubmit={submitCommentHandler}>
        <textarea onChange={changeCommentHandler} value={comment.content} name='content' required onClick={openHandler} className='comment-form__textarea' rows={3} placeholder='Mời bạn đặt câu hỏi' id="comment" ></textarea>
        {isOpen &&
          <div className='user-info'>
            <input onChange={changeCommentHandler} value={comment.name} name='name' type="text" placeholder='Họ và tên' required />
            <input onChange={changeCommentHandler} value={comment.email} name='email' type="email" placeholder='Email' required />
            <input onChange={changeCommentHandler} value={comment.phoneNumber} name='phoneNumber' type="text" placeholder='Số điện thoại' pattern="[0-9]*" />
            <button type='submit'>Gửi</button>
          </div>
        }
      </form>
      {comments && (<CommentList comments={comments} />)}

    </div>
  )
}

export default CommentComponent