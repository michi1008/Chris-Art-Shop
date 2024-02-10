import React from 'react';
import './HomeScreen.css';
import Product from '../components/Product';
import Loader from '../components/Loader';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
     { isLoading ? (
      <Loader />
     ) : error ? (
      <div className="error">
        {error?.data?.message || error.error}
      </div>
     ) : (
    <>
      <section className='gallery'>      
        <h1 className='gallery-title'>Art Gallery</h1>
        <div className='art'>     
        {products.map((product) => (
          <h3 key={product._id}><Product product={product} /></h3>
        ))}
        </div>     
      </section>  
      </>
      )}      
    </>   
  )
}

export default HomeScreen;