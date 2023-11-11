import React, { useState, useEffect } from 'react';

import './SearchResultPage.css';
import SearchBanner from '../../assets/background/SearchBanner.png'
import ProductCard from '../../components/UIElement/ProductCard'

const SearchResultPage = () => {
    const [searchByPrice, setSearchByPrice]= useState('0');
    const [searchByCategory, setSearchByCategory]= useState('2');

    const searchByCategoryHandler= (value)=> {
        setSearchByCategory(value) 
    };

    const searchByPriceHandler= (value)=> {
        setSearchByPrice(value)
    }
    

    return (
        <div className='search-page'>
            <div className='search-page-container'>
                <div className="left-container">
                    <h2>Bộ lọc sản phẩm</h2>
                    <div className="search-by-price">
                        <p className='filter-title'>Giá bán</p>
                        <ul>
                            <li onClick={()=> setSearchByPrice('1')} className={searchByPrice === '1' ? 'is-selected' : undefined}>Dưới 2 triệu</li>
                            <li onClick={()=> setSearchByPrice('2')} className={searchByPrice === '2' ? 'is-selected' : undefined}>Từ 2 - 4 triệu</li>
                            <li onClick={()=> setSearchByPrice('3')} className={searchByPrice === '3' ? 'is-selected' : undefined}>Từ 4 - 7 triệu</li>
                        </ul>
                    </div>
                    <div className="search-by-category">
                        <p className='filter-title'>Danh mục</p>
                        <ul>
                            <li onClick={()=> searchByCategoryHandler('1')} value={1} className={searchByCategory === '1' ? 'is-selected' : undefined}>Điện thoại</li>
                            <li onClick={()=> searchByCategoryHandler('2')} value={2} className={searchByCategory === '2' ? 'is-selected' : undefined}>Laptop</li>
                            <li onClick={()=> searchByCategoryHandler('3')} value={3} className={searchByCategory === '3' ? 'is-selected' : undefined}>Máy tính bảng</li>
                        </ul>
                    </div>
                </div>
                <div className="right-container">
                    <img src={SearchBanner} alt="search" />
                    <div className="search-results">

                        <div className='custom-product-card'><ProductCard/></div>
                        <div className='custom-product-card'><ProductCard/></div>
                        <div className='custom-product-card'><ProductCard/></div>
                        <div className='custom-product-card'><ProductCard/></div>
                        <div className='custom-product-card'><ProductCard/></div>
                        <div className='custom-product-card'><ProductCard/></div> 
                        <div className='custom-product-card'><ProductCard/></div>
                        <div className='custom-product-card'><ProductCard/></div>
                        <div className='custom-product-card'><ProductCard/></div>
                        <div className='custom-product-card'><ProductCard/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultPage