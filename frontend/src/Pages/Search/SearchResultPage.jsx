import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons'
import {
    faClipboardList,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import './SearchResultPage.css';
import SearchBanner from '../../assets/background/SearchBanner.png'
import ProductCard from '../../components/UIElement/ProductCard';
import Loader from '../../components/UIElement/Loader';
import VoucherCard from '../HomePage/components/VoucherCard';

const SearchResultPage = () => {
    let { keyword, page } = useParams();
    const navigate = useNavigate();
    const [isOverflow, setIsOverflow] = useState(false);
    const [vouchers, setVoucher] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [products, setProducts] = useState([]);
    const [maxItem, setMaxItem] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedPage, setSelectedPage] = useState(1);
    const [flag, setFlag] = useState(false);

    const scrollRef = useRef(0);
    const scrollListVoucherRef = useRef(0);
    useEffect(() => {
        const searchProduct = async () => {
            await axios.get(`http://localhost:5000/product/get-all-product?keyword=${keyword}&page=${page}`)
                .then(res => {
                    setProducts(res.data.result);
                    setMaxItem(res.data.maxLength);
                    const calculatedTotalPages = Math.ceil(res.data.maxLength / 12);
                    setTotalPages(calculatedTotalPages);
                })
                .catch(err => console.log(err));
        }
        searchProduct();
    }, [keyword, flag]);

    const handleSelectPage = (page) => {
        navigate(`/tim-kiem/${keyword}/${page}`);
        setFlag(!flag);
    }
    useEffect(() => {
        const getVouchers = async () => {
            await axios.get("http://localhost:5000/voucher/get-all-voucher")
                .then(res => {
                    setVoucher(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        };
        getVouchers();
        setCurrentDate(new Date());
    }, []);
    const filteredVoucher = vouchers.filter((voucher) => {
        return new Date(voucher.end) > currentDate;
    });
    const scrollNext = () => {
        const scrollContainer = scrollRef.current;

        if (scrollContainer) {
            scrollContainer.scrollLeft += 1200;
        }
    }

    const scrollPrev = () => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.scrollLeft -= 1200;
        }
    }
    return (
        <React.Fragment>
            <div className='search-page'>
                <div className='search-page-container'>
                    <div className="right-container">
                        <h1>Tìm với từ khóa: {keyword}</h1>
                        {products ? (
                            products.length > 0 ? (
                                <React.Fragment>
                                    <h2>Tìm thấy: {maxItem} sản phẩm</h2>
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
                        <div className="pages">
                            <ul className="pages-bar">
                                {/* Render danh sách các trang */}
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li className={selectedPage === index + 1 ? "selected" : ''} key={index + 1} onClick={() => {
                                        handleSelectPage(index + 1);
                                        setSelectedPage(index + 1);
                                    }}>
                                        {index + 1}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="voucher-container">
                            <div className="voucher-container__main">
                                <h2>CHƯƠNG TRÌNH KHUYẾN MÃI</h2>
                                <div className="scroll" ref={scrollRef}>
                                    <div ref={scrollListVoucherRef} className="voucher-container__list">
                                        {filteredVoucher.map(voucher => (
                                            <VoucherCard
                                                name={voucher.name}
                                                key={voucher._id}
                                                id={voucher._id}
                                                image={voucher.image} />
                                        ))}
                                    </div>
                                </div>
                                <button className="prev-btn" style={isOverflow ? { display: 'flex' } : { display: 'none' }} onClick={scrollPrev}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <button className="next-btn" style={isOverflow ? { display: 'flex' } : { display: 'none' }} onClick={scrollNext}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SearchResultPage