import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header () {
    return (
        <div className="Header">
            <div className="Header_Sidebar"></div>
            <div className="Header_Main">
                <h1 className="HeadingText">
                <Link className="Header_Link" to={'/'}>
                    Noteful
                </Link></h1>
            </div>
        </div>
    );
}

export default Header;
