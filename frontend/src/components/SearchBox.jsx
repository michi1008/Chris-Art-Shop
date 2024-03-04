import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SearchBox.css';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword(' ');
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        className='search-input'
        type='text'
        name='q'
        value={keyword}
        placeholder='Search...'
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
};

export default SearchBox;
