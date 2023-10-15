import React, {useState, useEffect, useCallback} from 'react';
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

const ProductPage = () => {
    let {pid}= useParams();
    const [product, setProduct]= useState([]);
    const navigate= useNavigate();
    const cart= localStorage.getItem('giohang') ? JSON.parse(localStorage.getItem('giohang')) : {items: []};
    const [items, setItems]= useState(cart.items);

    useEffect(()=> {
        axios.get(`http://localhost:5000/product//get-product/${pid}`)
        .then(res=> {setProduct(res.data)})
        .catch(err=> {
            window.alert(err)
        })
    }, [pid]);

    const cartItem= {
        id: product._id,
        name: product.name,
        price: product.sellPrice,
        image: product.image,
        qty: 1
    }

    
    const buyNowHandler= async ()=> {
        // setItems((prevItems)=> [...prevItems, cartItem]);
        localStorage.setItem("giohang", JSON.stringify({items: [...items, cartItem]}));
        navigate("/gio-hang")
    }
   


    return (
        <div className='product-page'>
            <div className='product-page__main-container'>
                <h2>{product.name}</h2>
                <div className='product-page__box-main'>
                    <div className='box-left'>
                        <ProductCarousel />
                        <PolicyComponent />
                        <DescComponent desc={product.desc} />
                        <RatingComponent />
                        <CommentComponent/>                  
                    </div>
                    <div className='box-right'>
                        <div className='price-container'>
                            <p className='price-container__title'>Giá bán:</p>
                            <div className='box-price'>
                                <p className='box-price-present'>{product.sellPrice}  *</p>
                                <p className='box-price-old'>29.000.000đ</p>
                            </div>
                        </div>
                        <VoucherComponent />
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
        </div>
    )
}

export default ProductPage
