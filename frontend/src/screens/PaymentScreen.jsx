import React, { useState, useEffect } from 'react';
import './PaymentScreen.css';
import { savePaymentMethod } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className='payment'>
        <h3 className='paymentTitle'>Payment Method</h3>
        <form onSubmit={submitHandler} className='paymentForm'>
          <label>
            PayPal or Credit Card
            <input
              type='checkbox'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className='checkmark'></span>
          </label>
          <button className='btn-continue' type='submit'>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
