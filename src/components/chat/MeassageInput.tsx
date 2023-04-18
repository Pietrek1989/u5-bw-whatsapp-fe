import React, { useState } from 'react';
import '../../styles/MessageInput.css'

interface MessageInputProps {
    sendMessage: (messageContent: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputValue.trim()) {
            sendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageInput;
