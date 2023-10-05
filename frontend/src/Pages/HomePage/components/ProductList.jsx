import React from 'react';

import ProductCard from '../../../components/UIElement/ProductCard';
import './ProductList.css';

const ProductList = props => {
  return (
    <ul className='product-list'>
        {props.productList.map(product=> (
            <li className='item'>
                <ProductCard
                    id= {product._id}
                    name= {product.name}
                    price= {product.sellPrice}/>            
            </li>
        ))}    
    </ul>
  )
}

export default ProductList