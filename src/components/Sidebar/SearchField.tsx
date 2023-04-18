import React, { useState } from 'react';
import '../../styles/SearchField.css';
import { RxMagnifyingGlass } from 'react-icons/rx'
import { RiFilter3Line } from 'react-icons/ri'

const SearchField: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="search-field-container bg-white align-items-center justify-content-between" style={{ borderBottom: "1px solid #ccc" }}>
            <div className="search-field bg-white p-3 rounded d-flex align-items-center justify-content-between">
                <input
                    type="text"
                    placeholder="Search or start new chat"
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <RiFilter3Line size={24} />
            </div>
        </div>
    );
};

export default SearchField;
