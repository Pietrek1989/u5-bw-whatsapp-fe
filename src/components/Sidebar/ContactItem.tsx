import React from 'react';
import "../../styles/ContactItem.css"

interface Contact {
    id: string;
    name: string;
    avatar?: string;
}

interface ContactItemProps {
    contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
    return (
        <div className="contact-item">
            <img className="contact-avatar" src={contact.avatar} alt={contact.name} />
            <div className="contact-details">
                <h4 className="contact-name">{contact.name}</h4>
                <p className="contact-last-message">
                    {/* Add the last message preview here */}
                    Last message text goes here...
                </p>
            </div>
        </div>
    );
};


export default ContactItem;
