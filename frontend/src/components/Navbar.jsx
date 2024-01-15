import React, { useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
        <Link to='/' className='title'>
            Chris Art Gallery
        </Link>
        <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? 'open' : ''}>
            <li>
            <NavLink to='/about'>About</NavLink>
            </li>
            <li>
            <NavLink to='/gallary'>Gallary</NavLink>
            </li>
            <li>
            <NavLink to='/contact'> <FaUser/> Sign In</NavLink>
            </li>
            <li>
            <NavLink to='/contact'> <FaShoppingCart/> Cart</NavLink>
            </li>
        </ul>
        </nav>
    )
}

export default Navbar


