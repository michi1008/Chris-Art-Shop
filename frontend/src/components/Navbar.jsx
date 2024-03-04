import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaWindowClose } from 'react-icons/fa';
import { BiSolidDownArrow } from 'react-icons/bi';
import { TiThMenu } from 'react-icons/ti';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <NavLink to='/' className='title' style={{ fontSize: '2rem' }}>
        Chris Art Gallery
      </NavLink>
      {userInfo ? <div className='nav-name'>Hello, {userInfo.name}</div> : ''}
      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <FaWindowClose
            style={{
              fontSize: '2rem',
              color: 'var(--clr-white)',
              backgroundColor: 'var(--clr-primary-5',
            }}
          />
        ) : (
          <TiThMenu style={{ fontSize: '2rem' }} />
        )}
      </div>

      <ul className={menuOpen ? 'open' : ''}>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
        <li>
          <NavLink to='/contact'>Contact</NavLink>
        </li>
        <li>
          {userInfo ? (
            <div>
              <NavLink to='/profile'>Profile</NavLink>
            </div>
          ) : (
            <NavLink to='/login'>
              <FaUser /> Login
            </NavLink>
          )}
        </li>
        <li className='logout'>
          {userInfo ? (
            <NavLink onClick={handleLogout}>
              <FaUser /> Logout
            </NavLink>
          ) : (
            ''
          )}
        </li>

        <li>
          <NavLink className='navlink-cart' to='/cart'>
            {' '}
            <FaShoppingCart /> Cart
            {cartItems.length > 0 && (
              <div className='navlink-cart-qty'>
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </div>
            )}
          </NavLink>
        </li>
        <SearchBox className='searchBox' />
        {userInfo && userInfo.isAdmin && (
          <div className='dropdown'>
            <button className='dropbtn'>
              Admin <BiSolidDownArrow />
            </button>
            <div className='dropdown-content'>
              <NavLink className='drodown-link' to='/admin/productList'>
                Products
              </NavLink>
              <NavLink className='drodown-link' to='/admin/orderList'>
                Orders
              </NavLink>
              <NavLink className='drodown-link' to='/admin/userList'>
                Users
              </NavLink>
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
