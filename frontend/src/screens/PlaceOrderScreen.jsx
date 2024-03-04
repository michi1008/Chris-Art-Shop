import React, { useEffect } from 'react';
import './PlaceOrderScreen.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { toast } from 'react-toastify';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='placeOrder-container'>
        <div className='placeOrder-items'>
          <div className='placeOrder-address'>
            <h4>Address: </h4>
            {cart.shippingAddress.address},<br></br>
            {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
            {cart.shippingAddress.state}
          </div>
          <hr className='placeOrder-hr'></hr>
          <div className='placeOrder-payment'>
            <h4>Payment Method: </h4>
            <div> {cart.paymentMethod}</div>
          </div>
          <hr className='placeOrder-hr'></hr>
          <div className='placeOrder-item'>
            <h4>Order Items: </h4>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ul>
                {cart.cartItems.map((item, index) => (
                  <li key={index} className='placeOrder-item-container'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='placeOrder-item-image'
                    />
                    <div className='placeOrder-item-info'>
                      <Link
                        className='placeOrder-item-title'
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                      ${(item.price * 100) / 100}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className='placeOrder-summary'>
          <h3>Order Summary</h3>
          <div className='placeOrder-summary-item'>
            <h5>Items: </h5>${cart.itemsPrice}
          </div>
          <div className='placeOrder-summary-item'>
            <h5>Shipping: </h5>${cart.shippingPrice}
          </div>
          <div className='placeOrder-summary-item'>
            <h5>Tax: </h5>${cart.taxPrice}
          </div>
          <hr></hr>
          <div className='placeOrder-summary-item placeOrder-summary-total'>
            <h3>Total: </h3>${cart.totalPrice}
          </div>
          {error && <Message variant='warning'>{error.data.message}</Message>}
          <button
            type='button'
            className='placeOrder-btn'
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
