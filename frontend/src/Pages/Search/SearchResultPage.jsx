import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons'

import './SearchResultPage.css';
import SearchBanner from '../../assets/background/SearchBanner.png'
import ProductCard from '../../components/UIElement/ProductCard';
import Loader from '../../components/UIElement/Loader';

const SearchResultPage = () => {
    let { keyword } = useParams();

    const [products, setProducts] = useState();
    const [searchByPrice, setSearchByPrice] = useState({
        min: 0,
        max: 0
    });
    const [searchByCategory, setSearchByCategory] = useState('0');

    const searchByCategoryHandler = (value) => {
        setSearchByCategory(value)
    };

    const searchByPriceHandler = (min, max) => {
        setSearchByPrice({ min: min, max: max })
    }

    useEffect(() => {
        const fileterByPrice = async () => {
            await axios.get(`http://localhost:5000/product/get-all-product`, { params: { min: searchByPrice.min, max: searchByPrice.max } })
                .then(res => setProducts(res.data))
                .catch(err => console.log(err));
        }
        fileterByPrice();
    }, [searchByPrice]);

    useEffect(() => {
        const searchProduct = async () => {
            await axios.get(`http://localhost:5000/product/get-all-product?keyword=${keyword}`)
                .then(res => setProducts(res.data))
                .catch(err => console.log(err));
        }
        searchProduct();
    }, [keyword]);

    return (
        <div className='search-page'>
            <div className='search-page-container'>
                <div className="left-container">
                    <h2>Bộ lọc sản phẩm</h2>
                    <div className="search-by-price">
                        <p className='filter-title'>Giá bán</p>
                        <ul>
                            <li onClick={() => searchByPriceHandler(0, 0)} className={searchByPrice === '0' ? 'is-selected' : undefined}>Tất cả</li>
                            <li onClick={() => searchByPriceHandler(0, 2000000)} className={searchByPrice.min === 0 && searchByPrice.max === 2000000 ? 'is-selected' : undefined}>Dưới 2 triệu</li>
                            <li onClick={() => searchByPriceHandler(2000000, 4000000)} className={searchByPrice.min === 2000000 && searchByPrice.max === 4000000 ? 'is-selected' : undefined}>Từ 2 - 4 triệu</li>
                            <li onClick={() => searchByPriceHandler(4000000, 7000000)} className={searchByPrice.min === 4000000 && searchByPrice.max === 7000000 ? 'is-selected' : undefined}>Từ 4 - 7 triệu</li>
                        </ul>
                    </div>
                    <div className="search-by-category">
                        <p className='filter-title'>Danh mục</p>
                        <ul>
                            <li onClick={() => searchByCategoryHandler('0')} value={0} className={searchByCategory === '0' ? 'is-selected' : undefined}>Tất cả</li>
                            <li onClick={() => searchByCategoryHandler('1')} value={1} className={searchByCategory === '1' ? 'is-selected' : undefined}>Điện thoại</li>
                            <li onClick={() => searchByCategoryHandler('2')} value={2} className={searchByCategory === '2' ? 'is-selected' : undefined}>Laptop</li>
                            <li onClick={() => searchByCategoryHandler('3')} value={3} className={searchByCategory === '3' ? 'is-selected' : undefined}>Máy tính bảng</li>
                        </ul>
                    </div>
                </div>
                <div className="right-container">
                    <img src={SearchBanner} alt="search" />
                    {products ? (
                        products.length > 0 ? (
                            <div className="search-results">
                                {products.map(product => (
                                    <div className='custom-product-card' key={product._id}>
                                        <ProductCard
                                            key={product._id}
                                            id={product._id}
                                            name={product.name}
                                            price={product.sellPrice}
                                            avgRating={product.avgRating}
                                            numOfReview={product.numOfReview} />
                                    </div>))}
                            </div>
                        ) : (
                            <div className='product-not-found'>
                                <div className='icon-container'>
                                    <FontAwesomeIcon className='magnify-glass-icon' icon={faMagnifyingGlassPlus} />
                                </div>
                                <p>Không có sản phẩm phù hợp</p>
                            </div>
                        )
                    ) : (
                        <Loader/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchResultPage