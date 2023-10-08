import React from 'react';
import { useState } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Chat() {
    const [text, setText] = useState('');
    const onChange = event => {
        event.preventDefault();
        setText(event.target.value);
    }
    const sendChat = event => {
        event.preventDefault();
        setText('');
    }
    return (
        <div className='chat_window'>
            <form className='chat' onSubmit={sendChat}>
                <h1 id="project_name">Now2Tech</h1>
                <input type="text" value={text} placeholder='Nhập tin nhắn...' onChange={onChange} />
                <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>

            </form>
        </div>
    );
}

export default Chat;