import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import './ProductPage.css';
import ProductCarousel from './components/ProductCarousel';
import PolicyComponent from './components/PolicyComponent';
import DescComponent from './components/DescComponent';
import VoucherComponent from './components/VoucherComponent';
import SpecsComponent from './components/SpecsComponent';
import RatingComponent from './components/RatingComponent';
import CommentComponent from './components/CommentComponent';
import {CartContext} from '../../ultis/cartContext';
import { formatPrice } from '../../ultis/formatPrice';

const ProductPage = () => {
    let {pid}= useParams();
    const [product, setProduct]= useState();
    const navigate= useNavigate();
    const cart= useContext(CartContext);

    useEffect(()=> {
        axios.get(`http://localhost:5000/product/get-product/${pid}`)
        .then(res=> {setProduct(res.data)})
        .catch(err=> {
            window.alert(err)
        })
    }, [pid]);

    let cartItem;
    if(product){
        cartItem= {
            id: product._id,
            name: product.name,
            price: product.sellPrice,
            image: product.image,
            vouchers: product.vouchers,
            qty: 1
        }
    }
    
    const buyNowHandler= async ()=> {
        cart.addToCart(cartItem);
        navigate("/gio-hang")
    }

    return (
        <div className='product-page'>
            {product ? (
                <div className='product-page__main-container'>
                <h2>{product.name}</h2>
                <div className='product-page__box-main'>
                    <div className='box-left'>
                        <ProductCarousel />
                        <PolicyComponent />
                        <DescComponent desc={product.desc} />
                        <RatingComponent reviews={product.reviews} numOfReview={product.numOfReview} avgRating={product.avgRating}/>
                        <CommentComponent/>                  
                    </div>
                    <div className='box-right'>
                        <div className='price-container'>
                            <p className='price-container__title'>Giá bán:</p>
                            {product.vouchers ? (
                                <div className='box-price'>
                                    <p className='box-price-present'>{formatPrice((100 - product.vouchers.percent) * product.sellPrice / 100)}  *</p>
                                    <p className='box-price-old'>{formatPrice(product.sellPrice)}</p>
                                </div>
                            ) : (
                                <div className='box-price'>
                                    <p className='box-price-present'>{formatPrice(product.sellPrice)}  *</p>
                                </div>
                            )}
                            
                        </div>
                        <VoucherComponent vouchers={product.vouchers}/>
                        <button onClick={buyNowHandler} className='product-page__btn buy-now-btn'>MUA NGAY</button>
                        <div className='button-group'>
                            <button className='product-page__btn'>
                                <FontAwesomeIcon className='product-page__icon' icon={faCartPlus} />
                                Thêm vào giỏ hàng</button>
                            <button className='product-page__btn'>Trả góp 0%</button>
                        </div>
                        <SpecsComponent specs={product.specs} />
                    </div>
                </div>
            </div>
            ): (
                <div>Loading</div>
            )}
            
        </div>
    )
}

export default ProductPage
