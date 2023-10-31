import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './CommentComponent.css';
import CommentList from './CommentList';

const CommentComponent = props => {
  const navigate= useNavigate();
  const [isOpen, setIsOpen]= useState(false);
  const [comments, setComments]= useState();
  const [comment, setComment]= useState({
    name: null,
    email: null,
    phoneNumber: null,
    comment: null
  })

  useEffect(()=> {
    const getComments= async ()=> {
      await axios.get(`http://localhost:5000/comment/get-comments/${props.productId}`)
      .then(res=> setComments(res.data))
      .catch(err=> console.log(err));
    }
    getComments();
  }, [props.productId]);

  const changeCommentHandler= (e)=> {
    setComment({...comment, [e.target.name]: e.target.value})
  };

  const submitCommentHandler= async (e)=> {
    e.preventDefault();

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
  }

  const openHandler= ()=> {setIsOpen(true)};
  return (
    <div className='comment-container'>
        <h2>Bình luận</h2>
        <form className='comment-form'>
          <textarea onChange={changeCommentHandler} name='content' required onClick={openHandler} className='comment-form__textarea' rows={3} placeholder='Mời bạn đặt câu hỏi' id="comment" ></textarea>
          { isOpen &&
            <div className='user-info'>
              <input onChange={changeCommentHandler} name='name' type="text" placeholder='Họ và tên' required/>
              <input onChange={changeCommentHandler} name='email' type="email" placeholder='Email' required/>
              <input onChange={changeCommentHandler} name='phoneNumber' type="text" placeholder='Số điện thoại' pattern="[0-9]*" />
              <button type='submit' onClick={submitCommentHandler}>Gửi</button>
            </div>
          }
        </form>
        {comments && (<CommentList comments={comments}/>)}
               
    </div>
  )
}

export default CommentComponent