import React, { useState } from 'react';
import './ShippingScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = () => {

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const defaultAddress = shippingAddress ? shippingAddress.address : '';
  const defaultCity = shippingAddress ? shippingAddress.city : '';
  const defaultPostalCode = shippingAddress ? shippingAddress.postalCode : '';
  const defaultCountry = shippingAddress ? shippingAddress.country : '';

  const [address, setAddress] = useState(defaultAddress);
  const [city, setCity] = useState(defaultCity);
  const [postalCode, setPostalCode] = useState(defaultPostalCode);
  const [country, setCountry] = useState(defaultCountry);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };


  return (
    <section>
      <CheckoutSteps step1 step2 />
      <div className="shipping">
      
      <div className="shippingTitle"><h3>Shipping</h3></div>
      <form onSubmit={submitHandler} className='shippingForm'>
        <label>Address: </label>
          <input
            type='text'
            className='shippingInput'
            placeholder='Enter your address'
            id='address'
            name='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
     <label>City: </label>
           <input
            type='text'
            className='shippingInput'
            placeholder='Enter your city'
            id='city'
            name='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>Postal Code: </label>
           <input
            type='text'
            className='shippingInput'
            placeholder='Enter your postalCode'
            id='postalCode'
            name='postalCode'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <label>Country: </label>
           <input
            type='text'
            className='shippingInput'
            placeholder='Enter your country'
            id='country'
            name='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          /> 
          <button className='btn-continue' type='submit'>Continue</button>     
      </form>
      </div>
     
    </section>
    
  )
}

export default Shipping