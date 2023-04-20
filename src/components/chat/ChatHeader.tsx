import { BsCameraVideo, BsTelephone, BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { RxDividerVertical } from 'react-icons/rx'
import { SlArrowDown } from 'react-icons/sl'
import '../../styles/ChatHeader.css';
//import React, { useEffect, useState } from 'react';
//import { useAppSelector } from '../../redux/hooks';

const ChatHeader: React.FC = () => {
    //const activeChat = useAppSelector(state => state.users.chats.active)
/*     const participants = useAppSelector(state => state.users.chats.list.find(c => c._id === activeChat).members)
    const [chatPartner, setChatPartner] = useState("")
    useEffect(() => {
        setChatPartner()
    },[activeChat]) */
/*     const activeChat = useAppSelector(state => state.users.chats.active)

    function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
        if (argument === undefined || argument === null) {
          throw new TypeError(message);
        }
      
        return argument;
      }

    const participants = useAppSelector(state => ensure(state.users.chats.list.find(c => c._id === activeChat)).members)
 */
    return (
        <div className="chat-header">
            <div className='d-flex align-items-center justify-content-between'>
                <img src={"https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"} alt={"alt"} />
                <h2>{"Some guy"}</h2>
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

