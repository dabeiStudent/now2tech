import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faXmark } from '@fortawesome/free-solid-svg-icons';


import './Chat.css';

const host = process.env.REACT_APP_BACKEND_URL;
function Chat() {
    const [socket, setSocket] = useState();
    const [text, setText] = useState('');
    const [content, setContent] = useState([]);
    const [typing, setTyping] = useState(false);
    useEffect(() => {
        setSocket(io(host));
        document.getElementById("a").style.display = "unset"
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on('sendWelcome', () => {
            setTyping(true);
            setTimeout(() => {
                setContent((prev) => [...prev, { text: "Xin chào quý khách, nếu có bất kì thắc mắc gì xin hãy nhắn tin, nhân viên của chúng tôi sẽ liên hệ quý khách", received: true }])
                setTyping(false);
            }, 700)
        })

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
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [content]);
    const sendChat = e => {
        e.preventDefault();
        if (text) {
            socket.emit("sendDataClient", text)
            setContent((prev) => [...prev, { text, received: false }]);
            setText('');
            setTyping(false);
        }
    }

    const [isChatOpen, setIsChatOpen] = useState(true);

    const openChat = e => {
        e.preventDefault();
        setIsChatOpen(true);
        document.getElementById("chat_window").style.display = "block"
    }
    const closeChat = e => {
        e.preventDefault();
        setIsChatOpen(false);
        document.getElementById("chat_window").style.display = "none"
    }
    return (
        <React.Fragment>
            <div className='button_chat_window'>
                {isChatOpen
                    ? <button className="chat-button" onClick={closeChat}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    : <button className="chat-button" onClick={openChat}>
                        <FontAwesomeIcon icon={faMessage} />
                    </button>}
            </div>
            <div id="chat_window" className='chat_window'>
                <form className='chat' onSubmit={sendChat}>
                    <h1 id="project_name">Now2Tech</h1>
                    <div className='chat_content'>
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

export default Chat;