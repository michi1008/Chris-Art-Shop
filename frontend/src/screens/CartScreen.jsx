import React from 'react';
import './CartScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className='cart-container'>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <h5 className='cart-empty'>
          Your cart is emplty{' '}
          <Link to='/'>
            <button>Go back</button>
          </Link>
        </h5>
      ) : (
        <div className='cart-content'>
          {cartItems.map((item) => (
            <div className='cartItem' key={item._id}>
              <img className='cart-image' src={item.image} alt={item.name} />
              <Link to={`/product/${item._id}`}>
                <div className='cart-name'>{item.name}</div>
              </Link>
              <div className='item-button'>
                <div className='cart-price'>${item.price}</div>
                <div className='trash'>
                  <button onClick={() => removeFromCartHandler(item._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
      <div className='total-amount'>
        <h4>Subtotal ({cartItems.length}) items</h4>
        <h4>
          ${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
        </h4>
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
    </div>
  );
};

export default CartScreen;
