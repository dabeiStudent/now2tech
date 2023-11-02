import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './CommentComponent.css';
import CommentList from './CommentList';
import { AuthContext } from '../../../ultis/authContext';
const CommentComponent = props => {
  const navigate= useNavigate();
  const authContext= useContext(AuthContext);
  const [isOpen, setIsOpen]= useState(false);
  const [comments, setComments]= useState();
  const [comment, setComment]= useState({
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

  const submitCommentHandler= async (e)=> {
    e.preventDefault();

    if(authContext.isLogin === false){
      if(comment.content === null
        || comment.name === null
        || comment.email === null 
        || comment.phoneNumber === null){
          return window.alert('Vui lòng nhập thông tin để bình luận.');
        }

        await axios.post(`http://localhost:5000/comment/create-comment/${props.productId}`,
        {
          name: comment.name,
          email: comment.email,
          phoneNumber: comment.phoneNumber,
          content: comment.content
        })
        .then(res=> navigate(0))
        .catch(err=> console.log(err));
    } else {
      if(comment.content === null){
          return window.alert('Vui lòng nhập bình luận của bạn.');
        }

        await axios.post(`http://localhost:5000/comment/logged-create-comment/${props.productId}`,
        {
          content: comment.content
        }, { withCredentials: true })
        .then(res=> navigate(0))
        .catch(err=> console.log(err));
    }
  }

  const openHandler = () => { setIsOpen(true) };
  return (
    <div className='comment-container'>
        <h2>Bình luận</h2>
        <form className='comment-form'>
          <textarea onChange={changeCommentHandler} name='content' required onClick={openHandler} className='comment-form__textarea' rows={3} placeholder='Mời bạn đặt câu hỏi' id="comment" ></textarea>
          { (isOpen === true && authContext.isLogin === false ) ? (
            <div className='user-info'>
              <input onChange={changeCommentHandler} name='name' type="text" placeholder='Họ và tên' required/>
              <input onChange={changeCommentHandler} name='email' type="email" placeholder='Email' required/>
              <input onChange={changeCommentHandler} name='phoneNumber' type="text" placeholder='Số điện thoại' pattern="[0-9]*" />
              <button type='submit' onClick={submitCommentHandler}>Gửi</button>
            </div>
          ) : ( isOpen === true && authContext.isLogin === true &&
            (<div className='logged-submit__btn'><button type='submit' onClick={submitCommentHandler}>Gửi</button></div>)
          )
          }
        </form>
        {comments && (<CommentList comments={comments}/>)}
               
    </div>
  )
}

export default CommentComponent