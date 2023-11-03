import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import './CommentItem.css';
import { AuthContext } from '../../../ultis/authContext';

const CommentItem = props => {
  const authContext= useContext(AuthContext);
  const [isReply, setIsReply]= useState(false);
  const [replyMessage, setReplyMessage]= useState({
    content: '',
    name: '',
    email: '',
    phoneNumber: ''
  });

  const replyHandler= ()=> {
    setIsReply(!isReply);
  }

  const changeReplyMessageHandler= (e)=> {
    setReplyMessage({...replyMessage, [e.target.name]: e.target.value})
  }

  const sendReplyHandler= async(e)=> {
    e.preventDefault();

    if(authContext.isLogin === false){
      if(replyMessage.content === ''
        || replyMessage.email === ''
        || replyMessage.name === ''
        || replyMessage.phoneNumber === ''){
          return window.alert("Vui lòng nhập thông tin để phản hồi.");
        }

      await axios.post(`http://localhost:5000/comment/reply-comment/${props.id}`,
      {
        content: replyMessage.content,
        name: replyMessage.name,
        email: replyMessage.email,
        phoneNumber: replyMessage.phoneNumber
      })
      .then(res=> {
        setIsReply(false);
        setReplyMessage({
          name: '',
          email: '',
          phoneNumber: '',
          content: ''
        });
        props.setFlag(!props.flag);
      })
      .catch(err=> console.log(err));
    } else{

      if(replyMessage.content === null){
          return window.alert("Vui lòng nhập thông tin để phản hồi.");
        }

      await axios.post(`http://localhost:5000/comment/logged-reply-comment/${props.id}`,
      {
        content: replyMessage.content,
      }, { withCredentials: true })
      .then(res=> {
        setIsReply(false);
        setReplyMessage({
          name: '',
          email: '',
          phoneNumber: '',
          content: ''
        });
        props.setFlag(!props.flag)
      })
      .catch(err=> console.log(err));
    }
  } 

  return (
    <div className='comment-item'>
      <li className='comment-item__question'>
        <div className='comment-item__top'>
          <div>
            <span className='comment-item__username'>{props.user.name}</span>
            {props.user.isAdmin === true && (
              <span className='comment-item__user-role'>
                <FontAwesomeIcon icon={faCircleCheck}/>
              </span>
            )}
          </div>
          <button className='reply-btn' onClick={replyHandler}>
            <FontAwesomeIcon icon={faComments}/>
            <span>Phản hồi</span>
          </button>
        </div>
        <div className='comment-item__body'>
          <span>{props.content}</span>
        </div>
      </li>

      {isReply && (
        <form className='reply-form'>
          <textarea onChange={changeReplyMessageHandler} name='content' required className='comment-form__textarea' rows={3} placeholder='Phản hồi của bạn...' id="comment" ></textarea>
            {authContext.isLogin === false ? (
              <div className='user-info'>
                <input onChange={changeReplyMessageHandler} name='name' type="text" placeholder='Họ và tên' required/>
                <input onChange={changeReplyMessageHandler}  name='email' type="email" placeholder='Email' required/>
                <input onChange={changeReplyMessageHandler} name='phoneNumber' type="text" placeholder='Số điện thoại' pattern="[0-9]*" />
                <button type='submit' onClick={sendReplyHandler}>Gửi</button>
              </div>
            ) : (
              <div className='logged-btn'><button type='submit' onClick={sendReplyHandler}>Gửi</button></div>
            )}
            
        </form>
      )}
      
      {props.replies.length !== 0 && props.replies.map(reply=> (
        <li className='comment-item__reply'>
          <div className='comment-item__top'>
            <div>
              <span className='comment-item__username'>{reply.user.name}</span>
              {reply.user.isAdmin === true && (
                <span className='comment-item__user-role'>
                  <FontAwesomeIcon icon={faCircleCheck}/>
                </span>
              )}
            </div>
            
          </div>
          <div>
            <span>{reply.content}</span>
          </div>
        </li>
      ))}
      
    </div>
    
  )
}

export default CommentItem