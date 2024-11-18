import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="steps">
      <div>
        {step1 ? (
          <Link className="steps-link" to="/login">
            Sign In
          </Link>
        ) : (
          <span className="steps-link-disabled">Sign In</span>
        )}
      </div>
      <div>
        {step2 ? (
          <Link className="steps-link" to="/shipping">
            Shipping
          </Link>
        ) : (
          <span className="steps-link-disabled">Shipping</span>
        )}
      </div>
      <div>
        {step3 ? (
          <Link className="steps-link" to="/payment">
            Payment
          </Link>
        ) : (
          <span className="steps-link-disabled">Payment</span>
        )}
      </div>
      <div>
        {step4 ? (
          <Link className="steps-link" to="/placeorder">
            Place Order
          </Link>
        ) : (
          <span className="steps-link-disabled">Place Order</span>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
