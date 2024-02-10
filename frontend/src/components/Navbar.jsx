import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useLoginMutation, useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const { cartItems} = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [logoutApiCall] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <nav>
        <Link to='/' className='title'>
            Chris Art Gallery
        </Link>
        {userInfo ? (<div className="nav-name">Hello, {userInfo.name}</div>) : ('')}        
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
            <NavLink to='/contact'>Contact</NavLink>
            </li>
            <li >
                    {userInfo ? (
                        <div>
                            <NavLink to='/profile'>Profile</NavLink>
                        </div>
                    ) : (
                        <NavLink to='/login'><FaUser/> Login</NavLink>
                    )}
            </li>
            <li className='logout'>
                    {userInfo ? (
                        <div>
                            <NavLink onClick={handleLogout}><FaUser/> Logout</NavLink>
                        </div>
                        ) : '' }
            </li>            
            <li>
            <NavLink className='navlink-cart' to='/cart'> <FaShoppingCart/> Cart</NavLink>
                {
                cartItems.length > 0 && (
                    <span className="cart-qty">
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                )
                }       
            </li>
        </ul>
        </nav>
    )
}

export default Navbar;


