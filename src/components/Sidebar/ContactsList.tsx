import React from 'react';
import ContactItem from './ContactItem';

interface Contact {
    id: string;
    name: string;
    avatar?: string;
}

const contacts: Contact[] = [
    {
        id: '1',
        name: 'John Doe',
        avatar: 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg', // Replace with a real image URL
    },
];

const ContactsList: React.FC = () => {
    return (
        <div className="contacts-list">
            {contacts.map((contact) => (
                <ContactItem key={contact.id} contact={contact} />
            ))}
        </div>
    );
};

export default ContactsList;
