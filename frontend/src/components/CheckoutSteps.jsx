import React from 'react'
import { Link } from 'react-router-dom'
import './CheckoutSteps.css'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='steps'>
      <div>
        { step1 ? (
          <Link className='steps-link' to='/login'>Sing In</Link>
        ) : (
          <Link disabled>Sing In</Link>
        )}
      </div>
      <div>
      { step2 ? (
        <Link className='steps-link' to='/shipping'>Shipping</Link>
      ) : (
        <Link disabled>Shipping</Link>
      )}
    </div>
    <div>
    { step3 ? (
      <Link className='steps-link' to='/payment'>Payment</Link>
    ) : (
      <Link disabled>Payment</Link>
    )}
  </div>
  <div>
  { step4 ? (
    <Link className='steps-link' to='/placeorder'>Place Order</Link>
  ) : (
    <Link disabled>Place Order</Link>
  )}
</div></div>
  )
}

export default CheckoutSteps