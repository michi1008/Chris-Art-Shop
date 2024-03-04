import React, { useState, useEffect } from 'react';
import './LoginScreen.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginSceen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='login'>
      <span className='login-title'>Login</span>
      <form className='login-form' onSubmit={submitHandler}>
        <div className='form-item'>
          <label>Email</label>
          <input
            type='email'
            className='login-input'
            placeholder='Enter your email...'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-item'>
          <label>Password</label>
          <input
            type='password'
            className='login-input'
            placeholder='Enter your password...'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='btn-container'>
          <button className='login-btn' type='submit' disabled={isLoading}>
            Login
          </button>

          {isLoading && <Loader />}

          <button className='login-signin-btn'>
            <Link
              className='link'
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Signup
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSceen;
