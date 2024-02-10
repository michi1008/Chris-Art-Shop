import React, { useState, useEffect } from 'react';
import './RegisterScreen.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
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
        <section>  
            <div className="register">
            <span className='registerTitle'>Register</span>
        <form className='registerForm' onSubmit={submitHandler}>    
        <label>Name</label>
          <input
            type='text'
            className='registerInput'
            placeholder='Enter your name...'
            id='name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />    
          <label>Email</label>
          <input
            type='email'
            className='registerInput'
            placeholder='Enter your email...'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            className='registerInput'
            placeholder='Enter your password...'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <label>Password Confirm</label>
          <input
            type='password'
            className='registerInput'
            placeholder='Confirm your password...'
            id='password'
            name='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className='btn-container'>
          <button className='registerBtn' type='submit' disabled={ isLoading }>
            Register
          </button>
          { isLoading && <Loader />}
          <button className='registerBtn'>
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </button>
          </div>
        </form>          
        </div>        
        </section>
    )
}

export default RegisterScreen;