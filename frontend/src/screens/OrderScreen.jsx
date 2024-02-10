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
  useGetPayPalClientIdQuery
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
        await payOrder({ orderId, details });
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
    ): error ? (<Message />
    ) : (
        <section className='order-screen-container'>
            <h2 className='order-screen-title'>Order: {order._id}</h2>
            <div className="order-screen-details-container">
                <div className="order-screen-items-container">  
                <div className='order-screen-shipping'>
                    <h3>Shipping</h3>
                    <p className='order-screen-shipping-title'>
                        Name: {order.user.name}
                    </p>
                    <p className='order-screen-shipping-title'>
                        Email: {order.user.email}
                    </p>
                    <p className='order-screen-shipping-title'>
                        Address:  
                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}, 
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                    { order.isDelivered ? (
                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                    ) : (
                        <Message variant='warning'>Not Delivered</Message>
                    )}
                    <hr className='order-screen-hr'></hr>
                </div>

                <div className='order-screen-payment'>
                    <h3>Payment Method</h3>
                    <p>
                        <strong>Method: </strong> {order.paymentMethod}
                    </p>
                    
                    { order.isPaid ? (
                        <Message variant='success'>Paid on {order.paidAt}</Message>
                    ) : (
                        <Message variant='warning'>Not Paid</Message>
                    )}
                </div>
                <hr className='order-screen-hr'></hr>

                <div className='order-screen-items'>
                    <h3>Order Items</h3>
                {order.orderItems.length === 0 ? (
                    <Message variant='warning'>Your cart is empty</Message>
                ) : (
                    <ul>
                    {order.orderItems.map((item, index) => (
                        <li key={index} className='order-item-container'>
                        <img src={item.image} alt={item.name} className='order-item-image' />
                        <div className="order-item-info">
                        <Link className='order-item-title' to={`/product/${item.product}`}>{item.name}</Link>
                            ${(item.price * 100) / 100}
                        </div>                  
                        </li>
                    ))}
                    </ul>
                    )}
                    { order.isDelivered ? (
                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                    ) : (
                        <Message variant='warning'>Not Delivered</Message>
                    )}
                </div>
                </div>
            
            <div className="order-summary">
            <h3>Order Summary</h3>
                <div className='order-summary-item'><h5>Items: </h5>${order.itemsPrice}</div> 
                <div className='order-summary-item'><h5>Shipping: </h5>${order.shippingPrice}</div>  
                <div className='order-summary-item'><h5>Tax: </h5>${order.taxPrice}</div> 
                <hr className='order-summary-hr'></hr> 
                <div className='order-summary-item order-summary-total'><h5>Total: </h5>${order.totalPrice}</div>  
                {error && (
                  <Message variant='warning'>{error.data.message}</Message>
                )}
                      {!order.isPaid && (
                <div>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                      <div>
                        <PayPalButtons
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
                      type='button'
                     
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </button>
                  </div>
                )}
        </div>     
            </div>
            
            
        </section>
    );
}

export default OrderScreen;