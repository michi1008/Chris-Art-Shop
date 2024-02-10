import React, { useState, useEffect } from 'react';
import './ProfileScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('sumbmitted')
    }
  
  return (
    <section className='profile-container'>
        <div className="profile">
            <h2 className='profileTitle'>User Profile</h2>
            <form className='profileForm' onSubmit={submitHandler}></form>
            <label>Name</label>
          <input
            type='text'
            className='profileInput'
            placeholder='Enter your name...'
            id='name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />    
          <label>Email</label>
          <input
            type='email'
            className='profileInput'
            placeholder='Enter your email...'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            className='profileInput'
            placeholder='Enter your password...'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <label>Password Confirm</label>
          <input
            type='password'
            className='profileInput'
            placeholder='Confirm your password...'
            id='password'
            name='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="profile-orders"></div>
    </section>
  )
}

export default ProfileScreen