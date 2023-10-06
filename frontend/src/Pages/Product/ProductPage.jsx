import React from 'react';

import './ProductPage.css';
import ProductCarousel from './components/ProductCarousel';
import PolicyComponent  from './components/PolicyComponent';

const ProductPage = () => {
  return (
    <div className='product-page'>
        <div className='product-page__main-container'>
            <h2>Điện thoại Iphone 15 Plus</h2>
            <div className='product-page__box-main'>
                <div className='box-left'>
                    <ProductCarousel/>
                    <PolicyComponent/>

                </div>
                <div className='box-right'>
                    <h2>Dday langtext de hien thi gia </h2>
                </div>
            </div>

        </div>
        
    </div>
  )
}

export default ProductPage
