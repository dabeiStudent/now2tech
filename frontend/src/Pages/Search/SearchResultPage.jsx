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

    useEffect(() => {
        const searchProduct = async () => {
            await axios.get(`http://localhost:5000/product/get-all-product?keyword=${keyword}`)
                .then(res => {
                    setProducts(res.data.result);
                    console.log(res.data.maxLength);
                })
                .catch(err => console.log(err));
        }
        searchProduct();
    }, [keyword]);

    return (
        <React.Fragment>
            <div className='search-page'>
                <div className='search-page-container'>
                    <div className="right-container">
                        <img src={SearchBanner} alt="search" />
                        <h1>Tìm với từ khóa: {keyword}</h1>
                        {products ? (
                            products.length > 0 ? (
                                <React.Fragment>
                                    <h2>Tất cả: {products.length}</h2>
                                    <div className="search-results">
                                        {products.map(product => (
                                            <div className='custom-product-card' key={product._id}>
                                                <ProductCard
                                                    key={product._id}
                                                    id={product._id}
                                                    name={product.name}
                                                    price={product.sellPrice}
                                                    avgRating={product.avgRating}
                                                    numOfReview={product.numOfReview}
                                                    image={product.pimage[0]} />
                                            </div>))}
                                    </div>
                                </React.Fragment>
                            ) : (
                                <div className='product-not-found'>
                                    <div className='icon-container'>
                                        <FontAwesomeIcon className='magnify-glass-icon' icon={faMagnifyingGlassPlus} />
                                    </div>
                                    <p>Không có sản phẩm phù hợp</p>
                                </div>
                            )
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SearchResultPage