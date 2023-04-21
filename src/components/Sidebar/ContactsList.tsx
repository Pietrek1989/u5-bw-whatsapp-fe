import React, { useEffect } from "react";
import ContactItem from "./ContactItem";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getChats } from "../../redux/actions";

const ContactsList: React.FC = () => {
  const chats = useAppSelector((state) => state.users.chats.list);

  return (
    <div className="contacts-list">
      {chats.length > 0 &&
        chats.map((c) => <ContactItem key={c._id} chat={c} />)}
    </div>
  );
};

export default ContactsList;
