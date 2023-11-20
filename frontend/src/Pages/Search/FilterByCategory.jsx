import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../components/UIElement/ProductCard";
import Loader from '../../components/UIElement/Loader';
import SearchBanner from '../../assets/background/SearchBanner.png'
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import './FilterByCategory.css';
import axios from "axios";
const FilterByCategory = () => {
    const navigate = useNavigate();
    const { category, brand, min, max } = useParams();
    const [items, setItem] = useState([]);
    const [brands, setBrand] = useState([]);
    const [categories, setCategories] = useState([]);
    const [flag, setFlag] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/product/get-all-product/?category=${category}&brand=${brand}&min=${min}&max=${max}`)
            .then(result => {
                setItem(result.data);
                axios.get(`http://localhost:5000/brand/get-brand-cate/${category}`)
                    .then(success => {
                        setBrand(success.data);
                        setSelectedCategory(category);
                        setSelectedBrand(brand);
                    })
                    .catch(err => {
                        alert(err);
                    })
            })
            .catch(err => {
                alert(err);
            })
    }, [flag])
    useEffect(() => {
        axios.get('http://localhost:5000/category/get-category')
            .then(result => {
                setCategories(result.data);
            })
            .catch(err => {
                alert('Có lỗi khi hiển thị');
            })
    }, [])
    const handleSelectCategory = (categoryName) => {
        setSelectedCategory(categoryName);
        setSelectedBrand(null);
        setMinPrice(null);
        setMaxPrice(null);
        navigate(`/loctheodanhmuc/${categoryName}/All/0/0`);
        setFlag(!flag);
    }
    const handleSelectBrand = (brandName) => {
        setSelectedBrand(brandName);
        navigate(`/loctheodanhmuc/${selectedCategory}/${brandName}/0/0`);
        setMinPrice(null);
        setMaxPrice(null);
        setFlag(!flag);
    }
    const handleSelectPrice = (valueMin, valueMax) => {
        setMinPrice(valueMin);
        setMaxPrice(valueMax)
        console.log(valueMin, valueMax);
        navigate(`/loctheodanhmuc/${selectedCategory}/${selectedBrand}/${valueMin}/${valueMax}`);
        setFlag(!flag);
    }

    return (
        <div className='search-page'>
            <div className='search-page-container'>
                <div className="left-container">
                    <h2>Bộ lọc sản phẩm</h2>
                    <div className="search-by-category">
                        <p className='filter-title'>Danh mục</p>
                        <ul>
                            {categories.map(category => (
                                <li key={category._id}
                                    onClick={() => handleSelectCategory(category.name)}
                                    className={selectedCategory === category.name ? 'selected' : ''}
                                    value={category._id}>{category.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="search-by-category">
                        <p className='filter-title'>Thương hiệu</p>
                        <ul>
                            <li
                                onClick={() => handleSelectBrand("All")}
                                className={selectedBrand === "All" ? 'selected' : ''}
                                value="All">Tất cả</li>
                            {brands.map(brand => (
                                <li key={brand._id}
                                    onClick={() => handleSelectBrand(brand.name)}
                                    className={selectedBrand === brand.name ? 'selected' : ''}
                                    value={brand._id}>{brand.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="search-by-category">
                        <p className='filter-title'>Giá bán</p>
                        <ul>
                            <li>
                                <input
                                    type="checkbox"
                                    id="price-all"
                                    checked={minPrice === 0 && maxPrice === 0}
                                    onChange={() => handleSelectPrice(0, 0)}
                                />
                                <label htmlFor="price-all">Tất cả</label>
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    id="price-under-10m"
                                    checked={minPrice === 0 && maxPrice === 10000000}
                                    onChange={() => handleSelectPrice(0, 10000000)}
                                />
                                <label htmlFor="price-under-10m">Dưới 10 triệu</label>
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    id="price-10m-to-15m"
                                    checked={minPrice === 10000000 && maxPrice === 15000000}
                                    onChange={() => handleSelectPrice(10000000, 15000000)}
                                />
                                <label htmlFor="price-10m-to-15m">Từ 10 tới 15 triệu</label>
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    id="price-over-15m"
                                    checked={minPrice === 15000000 && maxPrice === 9999999999999999}
                                    onChange={() => handleSelectPrice(15000000, 9999999999999999)}
                                />
                                <label htmlFor="price-over-15m">Trên 15 triệu</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right-container">
                    <h1>{category} - {brand === "All" ? "Tất cả" : brand}</h1>
                    {items ? (
                        items.length > 0 ? (
                            <div className="search-results">
                                {items.map(item => (
                                    <div className='custom-product-card' key={item._id}>
                                        <ProductCard
                                            key={item._id}
                                            id={item._id}
                                            name={item.name}
                                            price={item.sellPrice}
                                            avgRating={item.avgRating}
                                            numOfReview={item.numOfReview}
                                            image={item.pimage[0]} />
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
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    )
}

export default FilterByCategory;