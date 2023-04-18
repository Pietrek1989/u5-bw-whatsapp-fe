import React from 'react';

interface Message {
    sender: string;
    content: string;
    timestamp: string;
}

interface MessageListProps {
    messages: Message[];
    currentUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
    return (
        <div className="message-list">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender === currentUser ? 'sent' : 'received'}`}>
                    <p>{message.content}</p>
                    <span>{message.timestamp}</span>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
