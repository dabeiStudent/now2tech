import React from "react";
import { useState, useEffect, useRef } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ChatContent.css';

const host = process.env.REACT_APP_BACKEND_URL;
const ChatContent = () => {
    const senders = ['User1', 'User2', 'User3'];

    const [socket, setSocket] = useState();
    const [text, setText] = useState('');
    const [content, setContent] = useState([]);
    const [typing, setTyping] = useState(false);
    useEffect(() => {
        setSocket(io(host));
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on("sendDataServer", (data) => {
            setContent((prev) => [...prev, { text: data, received: true }]);
        });
        socket.on("start-typingServer", () => {
            setTyping(true);
        });
        socket.on("stop-typingServer", () => {
            setTyping(false);
        });
    }, [socket])

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [content]);

    const [typingTimeout, settypingTimeout] = useState(null);

    const onChange = event => {
        event.preventDefault();
        setText(event.target.value);
        socket.emit('start-typingClient');
        if (typingTimeout) clearTimeout(typingTimeout);
        settypingTimeout(
            setTimeout(() => {
                socket.emit('stop-typingClient');
            }, 1000)
        );
    }

    const sendChat = e => {
        e.preventDefault();
        if (text) {
            socket.emit("sendDataClient", text)
            setContent((prev) => [...prev, { text, received: false }]);
            setText('');
            setTyping(false);
        }
    }
    return (
        <React.Fragment>
            <div id="chat_window_admin" className='chat_window_admin'>
                <form className='chat_admin' onSubmit={sendChat}>
                    <h1 id="project_name_admin">Now2Tech</h1>
                    <div className='chat_content_admin'>
                        <ul className='chat_lines'>
                            {content.map((data) => (
                                data.received ? <li className="left" key={data.text}>{data.text}</li>
                                    : <li className="right" key={data.text}>{data.text}</li>
                            ))}
                            <li id="a" className="anchor" ref={messagesEndRef} />
                        </ul>
                    </div>
                    {typing ? <p>Đang nhập....</p> : <></>}
                    <input type="text" value={text} placeholder='Nhập tin nhắn...' onChange={onChange} />
                    <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>

                </form>
            </div>
        </React.Fragment>
    );
}


export default ChatContent;