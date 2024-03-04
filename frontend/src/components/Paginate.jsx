import React from 'react';
import { Link } from 'react-router-dom';
import './Paginate.css';

const Paginate = ({ pages, page, isAdmin = false, keyword = '', sortBy = '', style = '', category = '' }) => {
  return (
    pages > 1 && (
      <div className='pagination-container'>
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}?sortBy=${sortBy}&style=${style}&category=${category}`
                  : `/page/${x + 1}?sortBy=${sortBy}&style=${style}&category=${category}`
                : `/admin/productList/${x + 1}?sortBy=${sortBy}&style=${style}&category=${category}`
            }
            className={x + 1 === page ? 'active' : ''}
          >
            {x + 1}
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
