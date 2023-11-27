import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClipboardList,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import BigBanner from "./components/BigBanner";
import ProductCard from "../../components/UIElement/ProductCard";
import CategoryCard from "./components/CategoryCard";
import Loader from "../../components/UIElement/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.css'
import VoucherCard from "./components/VoucherCard";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const [products, setProduct] = useState([]);
    const [bestSeller, setBestSeller] = useState([]);
    const [maxSelling, setMaxSelling] = useState([]);
    const [page, setPage] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);
    const scrollRef = useRef(0);
    const scrollListVoucherRef = useRef(0);
    const [vouchers, setVoucher] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            await axios.get("http://localhost:5000/product/get-all-product", { params: { page: page } })
                .then((res) => {
                    if (page === 1) {
                        setProduct(res.data.result);
                    }
                    else {
                        setProduct((prevProducts) => [...prevProducts, ...res.data.result]);
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        };
        const getBestSeller = async () => {
            await axios.get(`http://localhost:5000/product/get-good-product?page=${page2}`)
                .then(result => {
                    if (page2 === 1) {
                        setBestSeller(result.data.result);
                        console.log(bestSeller)
                    }
                    else {
                        setBestSeller((prevProducts) => [...prevProducts, ...result.data.result]);
                    }
                })
                .catch(err => {
                    toast(err);
                })
        }
        const getMaxSelling = async () => {
            await axios.get(`http://localhost:5000/product/get-max-selling?page=${page3}`)
                .then(result => {
                    if (page3 === 1) {
                        setMaxSelling(result.data.result);
                        console.log(bestSeller)
                    }
                    else {
                        setMaxSelling((prevProducts) => [...prevProducts, ...result.data.result]);
                    }
                })
                .catch(err => {
                    toast(err);
                })
        }
        getData();
        getBestSeller();
        getMaxSelling();
    }, [page, page2, page3]);

    useEffect(() => {
        const getVouchers = async () => {
            setIsLoading(true);
            await axios.get("http://localhost:5000/voucher/get-all-voucher")
                .then(res => {
                    setVoucher(res.data);
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err);
                })
        };
        getVouchers();
    }, []);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        const scrollListVoucher = scrollListVoucherRef.current;
        if (scrollListVoucher.scrollWidth > scrollContainer.clientWidth) {
            setIsOverflow(true);
        }
    }, [vouchers]);
    useEffect(() => {
        const getCate = async () => {
            setIsLoading(true);
            await axios.get('http://localhost:5000/category/get-category')
                .then(result => {
                    setCategories(result.data);
                    setIsLoading(false)
                })
                .catch(err => {
                    toast('Có lỗi khi hiển thị');
                })
        };
        getCate();
    }, []);


    const seeMoreHandler = () => { setPage(page + 1) };

    const seeMoreBestSellerHandler = () => {
    };
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

    const filterByCate = (categoryName) => {
        navigate(`/loctheodanhmuc/${categoryName}/All/0/0/1`);
    }
    return (
        <React.Fragment>
            <ToastContainer />
            {isLoading ? (
                <Loader />) : (
                <div>
                    <BigBanner />
                    <div className="home-page-container">
                        <div className="category-container">
                            <div className="category-container__main">
                                <h2>Danh mục sản phẩm</h2>
                                {categories.map(category => (
                                    <div className="category-list" onClick={() => filterByCate(category.name)}>
                                        <CategoryCard>
                                            <FontAwesomeIcon className="category-card__icon" icon={faClipboardList} />
                                            <p>{category.name}</p>
                                        </CategoryCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="voucher-container">
                            <div className="voucher-container__main">
                                <h2>Chương trình khuyến mãi</h2>
                                <div className="scroll" ref={scrollRef}>
                                    <div ref={scrollListVoucherRef} className="voucher-container__list">
                                        {vouchers.map(voucher => (
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
                        <div className="best-seller-container">
                            <div className="best-seller-container__main">
                                <h2>Sản phẩm được nhiều người tin dùng</h2>
                                <div className="scroll">
                                    <div className="best-seller-container__list">
                                    {bestSeller && bestSeller.map(product => ( 
                                        <ProductCard
                                            key={product._id}
                                            id={product._id}
                                            name={product.name}
                                            price={product.sellPrice}
                                            avgRating={product.avgRating}
                                            numOfReview={product.numOfReview}
                                            image={product.pimage[0]} />                                            
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="all-product-container">
                            <div className="all-product-container__main">
                                <h2>Sản phẩm bán chạy</h2>
                                <div className="all-product-container__prod-list_2">
                                    {maxSelling && maxSelling.map(product => (
                                        
                                        <ProductCard
                                            key={product._id}
                                            id={product._id}
                                            name={product.name}
                                            price={product.sellPrice}
                                            avgRating={product.avgRating}
                                            numOfReview={product.numOfReview}
                                            image={product.pimage[0]} />
                                    
                                    ))}
                                </div>
                                {maxSelling.length >= page3 * 10 && (
                                    <div className="see-more-btn"><button onClick={seeMoreBestSellerHandler}>Xem thêm &raquo;</button></div>
                                )}
                            </div>
                        </div>
                        <div className="all-product-container">
                            <div className="all-product-container__main">
                                <h2>Tất cả sản phẩm</h2>
                                <div className="all-product-container__prod-list">
                                    {products && products.map(product => (
                                        <ProductCard
                                            key={product._id}
                                            id={product._id}
                                            name={product.name}
                                            price={product.sellPrice}
                                            avgRating={product.avgRating}
                                            numOfReview={product.numOfReview}
                                            image={product.pimage[0]} />
                                    ))}
                                </div>
                                {products.length >= page * 10 && (
                                    <div className="see-more-btn"><button onClick={seeMoreHandler}>Xem thêm &raquo;</button></div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>)}
        </React.Fragment>
    )
}

export default HomePage;