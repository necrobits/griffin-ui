import React from 'react';
import ReactDOM from 'react-dom';
import './SearchDropdown.scss';

export default function SearchDropdown({ render }) {
    return ReactDOM.createPortal(
        <>
            <div className='search-dropdown'>{render}</div>
        </>,
        document.getElementById('search-portal')
    );
}
