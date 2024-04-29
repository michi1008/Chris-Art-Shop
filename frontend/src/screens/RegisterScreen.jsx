import React, { useState, useEffect } from 'react';
import './RegisterScreen.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const isPasswordStrong = (password) => {
    // Define the criteria for password strength
    const minLength = 8; // Minimum length
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const lowercaseRegex = /[a-z]/; // At least one lowercase letter
    const digitRegex = /[0-9]/; // At least one digit
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/; // At least one special character
  
    // Check if the password meets all criteria
    return (
      password.length >= minLength &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      digitRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else if (!isPasswordStrong(password)) {
      toast.error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
      <div className='register'>
        <span className='register-title'>Register</span>
        <form className='register-form' onSubmit={submitHandler}>
          <div className='form-item'>
            <label>Name</label>
            <input
              type='text'
              className='register-input'
              placeholder='Enter your name...'
              id='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label>Email</label>
            <input
              type='email'
              className='register-input'
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
              className='register-input'
              placeholder='Enter your password...'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label>Password Confirm</label>
            <input
              type='password'
              className='register-input'
              placeholder='Confirm your password...'
              id='password'
              name='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='btn-container'>
            <button className='register-btn' type='submit' disabled={isLoading}>
              Register
            </button>
            {isLoading && <Loader />}
            <button className='register-login-btn'>
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </button>
          </div>
        </form>
      </div>
  );
};

export default RegisterScreen;
