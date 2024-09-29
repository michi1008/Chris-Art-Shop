import React, { useState } from 'react';
import './CartScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveDeliveryMethod } from '../slices/cartSlice';
import { removeFromCart } from '../slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [deliveryMethod, setDeliveryMethod] = useState('shipped');

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    dispatch(saveDeliveryMethod({ deliveryMethod }));
    // Delay the navigation slightly to allow the state to update in localStorage
  setTimeout(() => {
    navigate('/login?redirect=/shipping');
  }, 100); // 100ms delay should be enough
    
  };

  return (
    <div className='cart-container'>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <h5 className='cart-empty'>
          Your cart is empty{' '}
          <Link to='/'>
            <button className='go-back-btn'>Go back</button>
          </Link>
        </h5>
      ) : (
        <div className='cart-content'>
          {cartItems.map((item) => (
            <div className='cartItem' key={item._id}>
              <img className='cart-image' src={item.image} alt={item.name} />
              <Link to={`/product/${item._id}`}>
                <div className='cart-name'><h3>{item.name}</h3></div>
              </Link>
              <div className='item-button'>
                <div className='cart-price'><h3>${item.price}</h3></div>
                <div className='trash-btn'>
                  <button onClick={() => removeFromCartHandler(item._id)}>
                    <FaTrash color="white" fontSize="1.5rem"/>
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}

      {/* Conditionally render subtotal, delivery option, and checkout button if cart is not empty */}
      {cartItems.length > 0 && (
        <>
          <div className='total-amount'>
            <h4>Subtotal ({cartItems.length}) items</h4>
            <h4>
              ${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
            </h4>
          </div>

          <div className="delivery-option-container">
            <h4>Delivery option</h4>
            <select className='delivery-option'
              name='deliveryMethod'
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}>
              <option value=''>Select a delivery option</option>
              <option value='shipped'>Shipped</option>
              <option value='hand-delivered'>Hand-delivered</option>
            </select>
          </div>

          <div className='check-out-btn'>
            <button
              type='button'
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
