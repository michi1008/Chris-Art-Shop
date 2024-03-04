import React from 'react';
import './Product.css';

const Product = ({ product }) => {
  return (
    <>
      <div className='product'>
        <div>
          <a href={`/product/${product._id}`}>
            <img className='image' src={product.image} />
          </a>
          <div className='name'>
            <h5>{product.name}</h5>
          </div>
        </div>
        <div>
          <div className='product-info'>
            <h5 className='product-title'>Price: </h5>
            <h5 className='product-value'>${product.price}</h5>
          </div>
          <div className='product-info'>
            <h5 className='product-title'>Size: </h5>
            <h5 className='product-value'>{product.size}</h5>
          </div>
          <div className='product-info'>
            <h5 className='product-title'>Style: </h5>
            <h5 className='product-value'>{product.style}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
