import React from 'react';
import Header from './Header';
import SearchField from './SearchField';
import ContactsList from './ContactsList';
import "../../styles/Sidebar.css"

interface Props {
    showUsers: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = (props: Props) => {
    return (
        <div className="sidebar">
            <Header showUsers={props.showUsers}/>
            <SearchField />
            <ContactsList />
        </div>
    );
};

export default Sidebar;