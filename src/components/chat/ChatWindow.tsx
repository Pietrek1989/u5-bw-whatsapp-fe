import '../../styles/ChatHeader.css';
import '../../styles/MessageInput.css';
import '../../styles/MessageList.css';
import { BsCameraVideo, BsTelephone, BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { RxDividerVertical } from 'react-icons/rx'
import { SlArrowDown } from 'react-icons/sl'
import React, { useEffect, useState } from 'react';
import { BsEmojiLaughing, BsMic, BsPaperclip } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { io } from 'socket.io-client';
import { getHistory } from '../../redux/actions';
import { newMessage } from '../../redux/reducers';

const socket = io(`${process.env.REACT_APP_BE_URL}`, {transports: ["websocket"]})
const ChatWindow = () => {
    const dispatch = useAppDispatch()


    const active = useAppSelector(state => state.users.chats.active)
    const chats = useAppSelector(state => state.users.chats.list)
    const history = chats.find(c => c._id === active)
    const userId = useAppSelector(state => state.users.userInfo?._id)
    const [inputValue, setInputValue] = useState('');
    const user = useAppSelector(state => state.users.userInfo?._id)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputValue.trim()) {
            setInputValue('');
            socket.emit("outgoing-msg", {text: inputValue, room: active, sender: user})
        }
    };

    useEffect(() => {
        console.log("history", history)
        if (active.length) {
            dispatch(getHistory(active))
            socket.emit("join-room", active)
        }
        console.log("history again", history)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[active])

    useEffect(() => {
        socket.on("welcome", msg => {
            console.log(msg)
            socket.on("outgoing-msg", msg => {
                dispatch(newMessage(msg))
            })
        })
    },[])

    return (
        <>
        {active.length > 0 && <><div className="chat-header">
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
        <div className="message-list">
            {history.map((message, index) => (
                <div key={index} className={`message ${message.sender._id !== userId ? 'sent' : 'received'}`}>
                    <p>{message.content.text}</p>
                    <span>{message.createdAt}</span>
                </div>
            ))}
        </div>
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
        </form></>}
        </>
    )
}

export default ChatWindow