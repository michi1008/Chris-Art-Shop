import React, { useEffect } from 'react';
import './PlaceOrderScreen.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { updateCart } from '../utils/cartUtils';
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
  }, [cart.paymentMethod, cart.shippingAddress.address, cart.deliveryMethod, cart.shippingPrice, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        deliveryMethod: cart.deliveryMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to place order");
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='placeOrder-container'>
        <div className='placeOrder-items'>
          <div className='placeOrder-address'>
            <h2>Address: </h2>
            {cart.shippingAddress.address},<br></br>
            {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
            {cart.shippingAddress.state}
          </div>
          <hr className='placeOrder-hr'></hr>
          <div className='placeOrder-payment'>
            <h2>Payment Method: </h2>
            <div> {cart.paymentMethod}</div>
          </div>
          <hr className='placeOrder-hr'></hr>
          <div className='placeOrder-item'>
            <h2>Order Items: </h2>
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
          <h2>Order Summary</h2>
          <div className='placeOrder-summary-item'>
            <h3>Items: </h3>
            <span className='placeOrder-summary-value'>${cart.itemsPrice}</span>
          </div>
          <div className='placeOrder-summary-item'>
            <h3>Delivery Method: </h3>
            <span className='placeOrder-summary-value'>{cart.deliveryMethod}</span>
          </div>
          <div className='placeOrder-summary-item'>
            <h3>Shipping Cost: </h3>
            <span className='placeOrder-summary-value'>${cart.shippingPrice}</span>
          </div>
          <div className='placeOrder-summary-item'>
            <h3>Tax: </h3>
            <span className='placeOrder-summary-value'>${cart.taxPrice}</span>
          </div>
          <hr></hr>
          <div className='placeOrder-summary-item placeOrder-summary-total'>
            <h2>Total:</h2><h2>${cart.totalPrice}</h2>
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
