import React, { useState } from "react";
import "./ProductScreen.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Meta from "../components/Meta";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate("/cart");
  };

  return (
    <section className="product-container">
      <a href="/">
        <button className="go-back">Go back</button>
      </a>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="error">{error?.data?.message || error.error}</div>
      ) : (
        <>
          <Meta title={product.name} />
          <div className="product-details">
            <div className="image-container">
              <img className="image" src={product.image} alt="art" />
            </div>
            <div className="details">
              <div className="name">
                <h2>{product.name}</h2>
              </div>
              <div className="desc">
                <h4>{product.desc}</h4>
              </div>
              <div className="info">
                <div className="value">
                  <h4>Price: </h4>
                  <h4>${product.price}</h4>
                </div>
                <div className="value">
                  <h4>Size: </h4>
                  <h4>{product.size}</h4>
                </div>
              </div>
              <div className="add-to-cart">
                <button className="add-to-cart-btn" type="button" onClick={addToCartHandler}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductScreen;
