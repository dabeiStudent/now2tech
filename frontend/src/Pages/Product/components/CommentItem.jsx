import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faCircleCheck, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CommentItem.css';
import { AuthContext } from '../../../ultis/authContext';
import getCookie from '../../../ultis/getCookie';

const CommentItem = props => {
  const authContext = useContext(AuthContext);
  const [isAdmin, setAdmin] = useState(null);
  const [isReply, setIsReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState({
    content: '',
    name: '',
    email: '',
    phoneNumber: ''
  });
  useEffect(() => {
    setAdmin(null);
    setAdmin(getCookie('role'));
  }, [])
  const replyHandler = () => {
    setIsReply(!isReply);
  }

  const changeReplyMessageHandler = (e) => {
    setReplyMessage({ ...replyMessage, [e.target.name]: e.target.value })
  }

  const sendReplyHandler = async (e) => {
    e.preventDefault();
    if (authContext.isLogin === false) {
      if (replyMessage.content === ''
        || replyMessage.email === ''
        || replyMessage.name === ''
        || replyMessage.phoneNumber === '') {
        return toast("Vui lòng nhập thông tin để phản hồi.");
      }

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/comment/reply-comment/${props.id}`,
        {
          content: replyMessage.content,
          name: replyMessage.name,
          email: replyMessage.email,
          phoneNumber: replyMessage.phoneNumber
        })
        .then(res => {
          setIsReply(false);
          setReplyMessage({
            name: '',
            email: '',
            phoneNumber: '',
            content: ''
          });
          props.setFlag(!props.flag);
        })
        .catch(err => console.log(err));
    } else {

      if (replyMessage.content === null) {
        return toast("Vui lòng nhập thông tin để phản hồi.");
      }

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/comment/logged-reply-comment/${props.id}`,
        {
          content: replyMessage.content,
        }, { withCredentials: true })
        .then(res => {
          setIsReply(false);
          setReplyMessage({
            name: '',
            email: '',
            phoneNumber: '',
            content: ''
          });
          props.setFlag(!props.flag)
        })
        .catch(err => console.log(err));
    }
  }

  const removeComment = async (e) => {
    e.preventDefault();
    if (window.confirm('Bạn có chắc muốn xóa comment này ?')) {
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/comment/remove-comment/${props.id}`, { withCredentials: true })
        .then(result => {

          toast("Đã xóa comment");
          props.setFlag();
        })
        .catch(err => {
          toast('Không thể xóa');
        })
    }
  }
  return (
    <div className='comment-item'>
      <ToastContainer />
      <li className='comment-item__question'>
        <div className='comment-item__top'>
          <div>
            <span className='comment-item__username'>{props.user.name}</span>
            {props.user.isAdmin === true && (
              <span className='comment-item__user-role'>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
            )}
          </div>
          {isAdmin === "admin" &&
            <button className='reply-btn' onClick={removeComment}>
              <FontAwesomeIcon icon={faDeleteLeft} />
              <span>Xóa bình luận</span>
            </button>
          }
          <button className='reply-btn' onClick={replyHandler}>
            <FontAwesomeIcon icon={faComments} />
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
              <input onChange={changeReplyMessageHandler} name='name' type="text" placeholder='Họ và tên' required />
              <input onChange={changeReplyMessageHandler} name='email' type="email" placeholder='Email' required />
              <input onChange={changeReplyMessageHandler} name='phoneNumber' type="text" placeholder='Số điện thoại' pattern="[0-9]*" />
              <button type='submit' onClick={sendReplyHandler}>Gửi</button>
            </div>
          ) : (
            <div className='logged-btn'><button type='submit' onClick={sendReplyHandler}>Gửi</button></div>
          )}

        </form>
      )}

      {props.replies.length !== 0 && props.replies.map(reply => (
        <li className='comment-item__reply'>
          <div className='comment-item__top'>
            <div>
              <span className='comment-item__username'>{reply.user.name}</span>
              {reply.user.isAdmin === true && (
                <span className='comment-item__user-role'>
                  <FontAwesomeIcon icon={faCircleCheck} />
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