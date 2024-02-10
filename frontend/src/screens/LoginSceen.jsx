import React, { useState, useEffect } from 'react';
import './LoginScreen.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
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
        <section>  
            <div className="login">
            <span className='loginTitle'>Login</span>
        <form className='loginForm' onSubmit={submitHandler}>         
          <label>Email</label>
          <input
            type='email'
            className='loginInput'
            placeholder='Enter your email...'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            className='loginInput'
            placeholder='Enter your password...'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='btn-container'>
          <button className='loginBtn' type='submit' disabled={ isLoading }>
            Login
          </button>
          { isLoading && <Loader />}
          <button className='loginBtn loginSignupBtn'>
            <Link className='link' to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Signup
            </Link>
          </button>
          </div>
        </form>          
        </div>        
        </section>
    )
}

export default LoginSceen;