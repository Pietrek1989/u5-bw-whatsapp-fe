import React from 'react';
import '../../styles/MessageList.css';
import { useAppSelector } from '../../redux/hooks';

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
    const msgs = useAppSelector(state => state.users.chats.list)
    const active = useAppSelector(state => state.users.chats.active)
    const msgToDisplay = msgs.find(c => c._id === active)
    const userId = useAppSelector(state => state.users.userInfo?._id)
    return (
        <div className="message-list">
            {msgToDisplay?.messages.map((message, index) => (
                <div key={index} className={`message ${message.sender._id !== userId ? 'sent' : 'received'}`}>
                    <p>{message.content.text}</p>
                    <span>{message.createdAt}</span>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
