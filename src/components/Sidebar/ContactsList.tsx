import React, { useEffect } from 'react';
import ContactItem from './ContactItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getChats } from '../../redux/actions';

const ContactsList: React.FC = () => {
    const chats = useAppSelector(state => state.users.chats.list)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getChats())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage])

    return (
        <div className="contacts-list">
            {chats.length > 0 && chats.map((c) => (
                <ContactItem key={c._id} chat={c} />
            ))}
        </div>
    );
};

export default ContactsList;
