import React from "react";
import { useState } from "react";

import './ChatContent.css';
const ChatContent = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'John', content: 'Hello there!' },
        { id: 2, sender: 'Alice', content: 'Hi John!' },
        // ... more messages
    ]);

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const handleSelectMessage = (id) => {
        const selected = messages.find((message) => message.id === id);
        setSelectedMessage(selected);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const newMessageObj = {
            id: messages.length + 1,
            sender: 'Admin', // You can set the sender to the current user or any default value
            content: newMessage,
        };

        setMessages([...messages, newMessageObj]);
        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <div className="message-list">
                <h2>Messages</h2>
                <ul>
                    {messages.map((message) => (
                        <li key={message.id} onClick={() => handleSelectMessage(message.id)}>
                            {message.sender}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-box">
                <h2>Chat</h2>
                {selectedMessage ? (
                    <div>
                        <p><strong>{selectedMessage.sender}:</strong> {selectedMessage.content}</p>
                    </div>
                ) : (
                    <p>Select a message to start chatting</p>
                )}

                {/* Textarea for typing messages */}
                <textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>

                {/* Button to send a message */}
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};


export default ChatContent;