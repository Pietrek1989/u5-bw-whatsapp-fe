import React from 'react';
import { BsCameraVideo, BsTelephone, BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { RxDividerVertical } from 'react-icons/rx'
import { SlArrowDown } from 'react-icons/sl'
import '../../styles/ChatHeader.css';

interface ChatHeaderProps {
    chatPartnerName: string;
    chatPartnerAvatar: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chatPartnerName, chatPartnerAvatar }) => {
    return (
        <div className="chat-header">
            <div className='d-flex align-items-center justify-content-between'>
                <img src={chatPartnerAvatar} alt={chatPartnerName} />
                <h2>{chatPartnerName}</h2>
            </div>
            <div className="controls">
                <BsCameraVideo className="icon" />
                <BsTelephone className="icon" />
                <RxDividerVertical className="icon" />
                <BsSearch className="icon" />
                <SlArrowDown className="icon" />
            </div>
        </div>
    );
};

export default ChatHeader;

