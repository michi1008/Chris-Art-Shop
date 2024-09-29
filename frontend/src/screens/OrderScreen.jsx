import React, { useEffect } from 'react';
import './OrderScreen.css';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from '../slices/ordersApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  console.log(order);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap;
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message />
  ) : (
    <div className='order-screen-container'>
      <h2 className='order-screen-title'>Order: {order._id}</h2>
      <div className='order-screen-details-container'>
        <div className='order-screen-items-container'>
          <div className='order-screen-items-left'>
            <div className='order-screen-shipping'>
              <h2>Shipping</h2>
              <h4 className='order-screen-shipping'><span>Name: </span>{order.user.name}</h4>
              <h4 className='order-screen-shipping'><span>Email: </span>{order.user.email}</h4>
              <h4 className='order-screen-shipping'>
                <span className='order-screen-shipping'>Address: </span>
                {order.shippingAddress.address}, {order.shippingAddress.city} ,
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.state.slice(0,2).toUpperCase()}
              </h4>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='warning'>Not Delivered</Message>
              )}
              <hr className='order-screen-hr'></hr>
            </div>

            <div className='order-screen-payment'>
              <h2>Payment Method</h2>    
                <h4><span>Method: </span>
                {order.paymentMethod}</h4>
    

              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='warning'>Not Paid</Message>
              )}
            </div>
            <hr className='order-screen-hr'></hr>

            <div className='order-screen-items'>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant='warning'>Your cart is empty</Message>
              ) : (
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index} className='order-item-container'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='order-item-image'
                      />
                      <div className='order-item-info'>
                        <Link
                          className='order-item-title'
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
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='warning'>Not Delivered</Message>
              )}
            </div>
          </div>
          <div className='order-screen-items-right'>
            <div className='vl'></div>
          </div>
        </div>

        <div className='order-summary'>
          <h3>Order Summary</h3>
          <h4>Items: ${order.itemsPrice}</h4>
          <h4>Shipping: ${order.shippingPrice}</h4>
          <h4>Tax: ${order.taxPrice}</h4>
          <hr className='order-summary-hr'></hr>
          <h4>Total: ${order.totalPrice}</h4>
          {error && <Message variant='warning'>{error.data.message}</Message>}
          {!order.isPaid && (
            <div>
              {loadingPay && <Loader />}

              {isPending ? (
                <Loader />
              ) : (
                <div>
                  <PayPalButtons
                   style={{
                    layout: 'vertical', 
                    shape: 'rect',
                    label: 'paypal' 
                  }}
                  locale='en_US'
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              )}
            </div>
          )}

          {loadingDeliver && <Loader />}
          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <div>
                <button
                  className='order-delivered-btn'
                  type='button'
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
