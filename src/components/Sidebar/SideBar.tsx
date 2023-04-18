import React from 'react';
import Header from './Header';
import SearchField from './SearchField';
import ContactsList from './ContactsList';
import "../../styles/Sidebar.css"

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <Header />
            <SearchField />
            <ContactsList />
        </div>
    );
};

export default Sidebar;