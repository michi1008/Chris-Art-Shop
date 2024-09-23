import React from "react";
import "./Product.css";

const Product = ({ product }) => {
  return (
    <>
      <div className="product">
        <div>
          <a href={`/product/${product._id}`}>
            <img className="image" src={product.image} />
          </a>
          <div className="name">
            <h5>{product.name}</h5>
          </div>
        </div>
        <div>
          <div className="product-info">
            <h5 className="product-title">
              <span>Price: </span>
            </h5>
            <h5 className="product-value">${product.price}</h5>
          </div>
          <div className="product-info">
            <h5 className="product-title">
              <span>Size: </span>
            </h5>
            <h5 className="product-value">{product.size}</h5>
          </div>
          <div className="product-info">
            <h5 className="product-title">
              <span>Style: </span>
            </h5>
            <h5 className="product-value">{product.style}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
