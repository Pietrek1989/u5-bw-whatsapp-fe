import React, { useState } from 'react';
import { BsEmojiLaughing, BsMic, BsPaperclip } from 'react-icons/bs'
import '../../styles/MessageInput.css';
import {io} from "socket.io-client"
import { useAppSelector } from '../../redux/hooks';

interface MessageInputProps {
    sendMessage: (messageContent: string) => void;
    socket: any
}

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage, socket }) => {
    const [inputValue, setInputValue] = useState('');
    const active = useAppSelector(state => state.users.chats.active)
    const user = useAppSelector(state => state.users.userInfo?._id)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputValue.trim()) {
            sendMessage(inputValue);
            setInputValue('');
            socket.emit("outgoing-msg", {text: inputValue, room: active, sender: user})
        }
    };

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <BsEmojiLaughing className="icon" />
            <BsPaperclip className="icon" />
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a message..."
            />
            <BsMic className="icon" />
        </form>
    );
};

export default MessageInput;
