import React, { useState, useEffect } from 'react';
import { savePaymentMethod } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps'
import './PaymentScreen.css'

const PaymentScreen = () => {

    const [ paymentMethod, setPaymentMethod ] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])
   

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod({ paymentMethod }));
        navigate('/placeorder');
      };

  return (
    <section>
      <div className="payment">
      <CheckoutSteps step1 step2 step3 />
      <div className="paymentTitle"><h3>Payment Method</h3></div>
      <form onSubmit={submitHandler} className='paymentForm'>
        <label htmlFor="" className="radio-form">
        <input 
            type="radio" 
            id="PayPal"  
            name="paymentMethod" 
            value="PayPal" 
            checked 
            onChange = { (e) => setPaymentMethod(e.target.value )}
        />
        PayPal or Credit Card
        </label>   
        <button className='btn-continue' type='submit'>Continue</button>     
      </form>
      </div>
     
    </section>
  )
}

export default PaymentScreen