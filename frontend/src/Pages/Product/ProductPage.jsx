import React, { useState, useEffect, useContext } from 'react';
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
import { CartContext } from '../../ultis/cartContext';
import { AuthContext } from '../../ultis/authContext';
import { OrderContext } from '../../ultis/orderContext';
import { formatPrice } from '../../ultis/formatPrice';
import Loader from '../../components/UIElement/Loader';

const ProductPage = () => {
    let { pid } = useParams();
    const [product, setProduct] = useState();
    const navigate = useNavigate();
    const cart = useContext(CartContext);
    const authContext = useContext(AuthContext);
    const orderContext = useContext(OrderContext);

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:5000/product/get-product/${pid}`)
                .then(res => {
                    setProduct(res.data);
                })
                .catch(err => {
                    window.alert(err)
                })
        };
        getData();
    }, [pid]);

    let cartItem;
    if (product) {
        cartItem = {
            id: product._id,
            name: product.name,
            price: product.sellPrice,
            image: product.pimage[1],
            vouchers: product.vouchers,
            qty: 1
        }
    }

    const addToCartHandler = async () => {
        cart.addToCart(cartItem);
        navigate("/gio-hang")
    };

    const buyNowHandler = () => {
        if (authContext.isLogin === false) {
            return window.alert("Vui lòng đăng nhập để mua hàng");
        }

        orderContext.setSelectedItems([cartItem]);
        navigate('/thong-tin-giao-hang');
    }
    const navigateToCategory = (pCate) => {
        navigate(`/loctheodanhmuc/${pCate}/All/0/0`);
    }
    const navigateToBrand = (pCate, pBrand) => {
        navigate(`/loctheodanhmuc/${pCate}/${pBrand}/0/0`);
    }
    return (
        <div className='product-page'>
            {product ? (
                <div className='product-page__main-container'>
                    <div className="top_product-page">
                        <h2 className='product-cate' onClick={() => navigateToCategory(product.category)}>{product.category}</h2>
                        <h2 className='product-cate' onClick={() => navigateToBrand(product.category, product.brand)}> {'>'} {product.brand} </h2>
                        <h2> {'>'} {product.name}</h2>
                    </div>
                    <div className='product-page__box-main'>
                        <div className='box-left'>
                            <ProductCarousel />
                            <PolicyComponent />
                            <DescComponent desc={product.desc} />
                            <RatingComponent reviews={product.reviews} numOfReview={product.numOfReview} avgRating={product.avgRating} />
                            <CommentComponent productId={product._id} />
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
                            <VoucherComponent vouchers={product.vouchers} />
                            <button onClick={buyNowHandler} className='product-page__btn buy-now-btn'>MUA NGAY</button>
                            <div className='button-group'>
                                <button className='product-page__btn' onClick={addToCartHandler}>
                                    <FontAwesomeIcon className='product-page__icon' icon={faCartPlus} />
                                    Thêm vào giỏ hàng</button>
                                <button className='product-page__btn'>Trả góp 0%</button>
                            </div>
                            <SpecsComponent specs={product.specs} />
                        </div>
                    </div>
                </div >
            ) : (
                <Loader />
            )}
        </div >
    )
}

export default ProductPage
