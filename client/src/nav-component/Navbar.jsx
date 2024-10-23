import React, { useState } from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import image from '../assets/logo.png';
import { Consumer } from '../store/StoreToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isLoggedin } = Consumer();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header>
            <div className="container">
                <div className="logo-brand">
                    <NavLink to="/" className="navlink">
                        <img className="logo-image" src={image} alt="Logo" />
                    </NavLink>
                </div>

                <nav>
                    <button className="user-toggle-button navbar-links" onClick={toggleMenu}>
                        ☰
                    </button>
                    <ul className={`nav-links navbar-links ${isOpen ? 'active' : 'noactive'}`}>
                        <li><NavLink to="/" className="navlink">Home</NavLink></li>
                        <li><NavLink to="/about" className="navlink">About</NavLink></li>
                        <li><NavLink to="/contact" className="navlink">Contact</NavLink></li>

                        {isLoggedin ? (
                            <>
                                <li><NavLink to="/service" className="navlink">Service</NavLink></li>
                                <li><NavLink to="/user/dashboard" className="navlink">Dashboard</NavLink></li>
                                <li><NavLink to="/logout" className="navlink">Logout</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/service" className="navlink">Service</NavLink></li>
                                <li><NavLink to="/login" className="navlink">Login</NavLink></li>
                                <li><NavLink to="/register" className="navlink">Register</NavLink></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
