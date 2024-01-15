import React from 'react';
import './ProductScreen.css';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

const ProductScreen = () => {

    const { id: productId} = useParams();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    console.log(product)
  return (
    <section>
        <a href='/'><button className='go-back'>Go back</button></a>
        { isLoading ? (<Loading />) : error ? (
        <div className="error">{error?.data?.message || error.error}</div>) : (
          <>
          <div className='product-details'>
            <div className='image-container'>
                <img className='image' src={product.image} alt='art'/>
            </div>
            <div className='details'>
                <div className='name'><h2>{product.name}</h2></div>
                <div className='desc'><h5>{product.desc}</h5></div>
                <div className='prices'>
                    <div className='price'><h5>Original Price</h5><p>${product.originalPrice}</p></div>
                    <div className='price'><h5>Print Price</h5><p>${product.printPrice}</p></div>
                </div> 
                <div className="add-to-cart">
                    <button>Add to cart</button>
                </div>
            </div>                      
        </div>
          </>
        )}
        
    </section>
  )
}

export default ProductScreen