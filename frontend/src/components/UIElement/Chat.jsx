import React, { useState } from 'react';

function Chat() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatWindow = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="chat-window" style={{ display: 'block' }}>
            {/* Giao diện của cửa sổ chat */}
            <div className="chat-content">
                {/* Nội dung chat */}
            </div>
            <button className="close-chat" onClick={toggleChatWindow}>
                Đóng Chat
            </button>
        </div>
    );
}

export default Chat;