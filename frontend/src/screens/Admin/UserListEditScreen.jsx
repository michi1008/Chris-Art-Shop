import React from 'react';
import './UserListEditScreen.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const UserListEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('user updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
  return (
    <section className='admin-user-edit'>
      <Link to='/admin/userList'>
        <button className='user-edit-back-btn'>Go back</button>
      </Link>
      <div>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <form className='user-edit-form' onSubmit={submitHandler}>
            <label>Name</label>
            <input
              type='text'
              className='user-edit-input'
              placeholder='Enter name'
              id='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email Address</label>

            <input
              type='text'
              className='user-edit-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className='user-edit-input-isAdmin'>
              Is Admin
              <input
                type='checkbox'
                placeholder='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <span className='checkmark'></span>
            </label>

            <button className='user-edit-update-btn'>Update</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default UserListEditScreen;
