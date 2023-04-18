import React from 'react';
import "../../styles/ContactItem.css"
import { Chat } from '../../interfaces';
import { useAppDispatch } from '../../redux/hooks';
import { setActiveChat } from '../../redux/reducers';

const ContactItem: React.FC<{chat: Chat}> = (props) => {
    const dispatch = useAppDispatch()

    return (
        <div className="contact-item" onClick={() => dispatch(setActiveChat(props.chat._id))}>
            <img className="contact-avatar" src={props.chat.members[1].avatar ? props.chat.members[1].avatar: "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"} alt={"bla"} />
            <div className="contact-details">
                <h4 className="contact-name">{props.chat.members[1].name}</h4>
                <p className="contact-last-message">
                    {/* Add the last message preview here */}
                    Last message text goes here...
                </p>
            </div>
        </div>
    );
};


export default ContactItem;
