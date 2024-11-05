import React, { useState } from 'react';
import axios from 'axios';
import chatCatIcon from './chatCat.png';
import './chatCat.css';

const ChatCat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);

        try {
            // Sending the user's message to your backend server
            const res = await axios.post('http://localhost:4000/chat', {
                message: input,
            });

            // Assuming your backend returns the reply in `res.data.reply`
            const botReply = { role: 'bot', content: res.data.reply };
            setMessages([...messages, userMessage, botReply]);
        } catch (error) {
            console.error('Error communicating with ChatCat:', error);
            const errorMessage = { role: 'bot', content: "Sorry, there was an issue processing your request." };
            setMessages([...messages, userMessage, errorMessage]);
        }

        setInput('');  // Clear input after sending
    };

    return (
        <div className={`chatcat-container ${isOpen ? 'open' : ''}`}>
            <div className="chatcat-icon" onClick={toggleChat}>
                <img src={chatCatIcon} alt="ChatCat Icon" className="chatcat-image" />
                <div className="chatcat-textbox">
                    <p>ChatCat here, how can I help?</p>
                </div>
            </div>
            {isOpen && (
                <div className="chatcat-chatbox">
                    <div className="chatcat-header">
                        <h2>ChatCat</h2>
                        <button className="close-btn" onClick={toggleChat}>X</button>
                    </div>
                    <div className="chatcat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chatcat-message ${msg.role}`}>
                                {msg.role === 'user' ? 'You' : 'ChatCat'}: {msg.content}
                            </div>
                        ))}
                    </div>
                    <div className="chatcat-input-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatCat;
