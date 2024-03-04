import React, { useState } from 'react';
import './ShippingScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const defaultAddress = shippingAddress ? shippingAddress.address : '';
  const defaultCity = shippingAddress ? shippingAddress.city : '';
  const defaultPostalCode = shippingAddress ? shippingAddress.postalCode : '';
  const defaultState = shippingAddress ? shippingAddress.state : '';

  const [address, setAddress] = useState(defaultAddress);
  const [city, setCity] = useState(defaultCity);
  const [postalCode, setPostalCode] = useState(defaultPostalCode);
  const [state, setState] = useState(defaultState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, state }));
    navigate('/payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className='shipping'>
        <div className='shippingTitle'>
          <h3>Shipping</h3>
        </div>
        <form className='shipping-form' onSubmit={submitHandler}>
          <div className='shipping-address'>
          <label>Address: </label>
          <input
            type='text'
            placeholder='Enter your address'
            id='address'
            name='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
            </div>
            <div className='shipping-address'>
          <label>City: </label>
          <input
            type='text'
            placeholder='Enter your city'
            id='city'
            name='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          </div>
          <div className='shipping-address'>
          <label>Postal Code: </label>
          <input
            type='text'
            placeholder='Enter your postalCode'
            id='postalCode'
            name='postalCode'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          </div>
          <div className='shipping-address'>
          <label>State: </label>
          <input
            type='text'
            placeholder='Enter your state'
            id='state'
            name='state'
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          </div>
          <button className='continue-btn' type='submit'>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
