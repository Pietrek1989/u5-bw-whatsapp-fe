import React from 'react';
import "../../styles/ContactItem.css"
import { Chat } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setActiveChat } from '../../redux/reducers';
import { getHistory } from '../../redux/actions';
import { io } from "socket.io-client";

const socket = io(`${process.env.REACT_APP_BE_URL}`, {transports: ["websocket"]})

const ContactItem: React.FC<{chat: Chat}> = (props) => {
    const activeChat = useAppSelector(state => state.users.chats.active)
    const dispatch = useAppDispatch()
    return (
        <div className="contact-item" onClick={() => {dispatch(setActiveChat(props.chat._id)); dispatch(getHistory(props.chat._id)); socket.emit("join-room", activeChat)}}>
            <img className="contact-avatar" src={"https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"} alt={"bla"} />
            <div className="contact-details">
                <h4 className="contact-name">{props.chat.members[props.chat.members.length-1].name}</h4>
                <p className="contact-last-message">
                    {/* Add the last message preview here */}
                    Last message text goes here...
                </p>
            </div>
        </div>
    );
};


export default ContactItem;
