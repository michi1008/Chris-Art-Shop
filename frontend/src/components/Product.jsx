import React from 'react'
import './Product.css'

const Product = ({ product} )=> {
  console.log(product)
  return (
    <>
        <div className='product'>
            <a href={`/product/${product._id}`}><img className='image' src={product.image} /></a>
            <div className='name'><h5>{product.name}</h5></div>
            <div className='prices'>
                <div className='price'><h5>Original Price</h5><p>${product.originalPrice}</p></div>
                <div className='price'><h5>Print Price</h5><p>${product.printPrice}</p></div>
            </div>           
        </div>
    </>
  )
}

export default Product