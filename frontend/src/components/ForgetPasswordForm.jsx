import React, { useState } from 'react';
import { useForgetPasswordMutation } from '../slices/apiSlice';
import './ForgetPasswordForm.css';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [forgetPassword] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgetPassword({ email }).unwrap();
      setMessage(response.message);
    } catch (err) {
      setMessage(err?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="forgetPasswordContainer">
      <div className="forgetPasswordTitle">
        <h2>Forget Password</h2>
      </div>
      <form onSubmit={handleSubmit} className="forgetPasswordForm">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <button type="submit">Submit</button>
          {message && <p className="message">👉 {message}</p>}
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
