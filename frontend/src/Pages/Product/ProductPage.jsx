import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './ProductPage.css';
import ProductCarousel from './components/ProductCarousel';
import PolicyComponent from './components/PolicyComponent';
import DescComponent from './components/DescComponent';
import VoucherComponent from './components/VoucherComponent';
import SpecsComponent from './components/SpecsComponent';
import RatingComponent from './components/RatingComponent';

const ProductPage = () => {
    return (
        <div className='product-page'>
            <div className='product-page__main-container'>
                <h2>Điện thoại Iphone 15 Plus</h2>
                <div className='product-page__box-main'>
                    <div className='box-left'>
                        <ProductCarousel />
                        <PolicyComponent />
                        <DescComponent />
                    </div>
                    <div className='box-right'>
                        <div className='price-container'>
                            <p className='price-container__title'>Giá bán:</p>
                            <div className='box-price'>
                                <p className='box-price-present'>25.999.000đ  *</p>
                                <p className='box-price-old'>29.000.000đ</p>
                            </div>
                        </div>
                        <VoucherComponent />
                        <button className='product-page__btn buy-now-btn'>MUA NGAY</button>
                        <div className='button-group'>
                            <button className='product-page__btn'>
                                <FontAwesomeIcon className='product-page__icon' icon={faCartPlus} />
                                Thêm vào giỏ hàng</button>
                            <button className='product-page__btn'>Trả góp 0%</button>
                        </div>

                    </div>
                    <SpecsComponent />
                </div>
            </div>
        </div>
    </div >
    )
}

export default ProductPage
