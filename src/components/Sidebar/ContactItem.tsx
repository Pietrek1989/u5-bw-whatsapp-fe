import React from 'react';
import "../../styles/ContactItem.css"
import { Chat } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setActiveChat } from '../../redux/reducers';



const ContactItem: React.FC<{chat: Chat}> = (props) => {
    const user = useAppSelector(state => state.users.userInfo)
    const dispatch = useAppDispatch()
    const partner = props.chat.members.filter(m => m._id !== user._id)[0]
    return (
        <div className="contact-item" onClick={() => {dispatch(setActiveChat(props.chat._id))}}>
            <img className="contact-avatar" src={partner.avatar ? partner.avatar : "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"} alt={"bla"} />
            <div className="contact-details">
                <h4 className="contact-name">{partner.name}</h4>
                <p className="contact-last-message">
                    {/* Add the last message preview here TODO */}
                    Last message text goes here...
                </p>
            </div>
        </div>
    );
};


export default ContactItem;
