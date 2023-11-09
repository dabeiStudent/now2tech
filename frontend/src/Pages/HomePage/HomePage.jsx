import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTabletScreenButton, 
    faMobileScreen, 
    faLaptop, 
    faComputer, 
    faTv, 
    faDesktop,
    faHeadphonesSimple,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { faKeyboard, faHardDrive } from '@fortawesome/free-regular-svg-icons'

import BigBanner from "./components/BigBanner";
import ProductCard from "../../components/UIElement/ProductCard";
import VoucherList from "./components/VoucherList";
import { Slider } from "./components/Slider";
import CategoryCard from "./components/CategoryCard";

import './HomePage.css'
import VoucherCard from "./components/VoucherCard";
const HomePage = () => {
    const [products, setProduct] = useState([]);
    const [page, setPage]= useState(1);
    const scrollRef= useRef(0);

    useEffect(() => {
        axios.get("http://localhost:5000/product/get-all-product", {params: {page: page}})
        .then((res) => {
            if(page === 1){
                setProduct(res.data);
            }
            else{
                setProduct((prevProducts)=>[...prevProducts, ...res.data]);
            }   
        })
        .catch(err => {
            console.log(err);
        })    
    }, [page]);

    const seeMoreHandler= ()=>{ setPage(page+1)};

    const scrollNext= ()=> {
        const scrollContainer= scrollRef.current;

        if(scrollContainer){
            scrollContainer.scrollLeft += 1220;
        }
    }

    const scrollPrev= ()=> {
        const scrollContainer= scrollRef.current;
        if(scrollContainer){
            scrollContainer.scrollLeft -= 1200;
        }
    }

    return (
        <div>
            <BigBanner />
            {/* <div className="custom-slider">
                <Slider />
            </div> */}
            
            <div className="home-page-container">
                {/* <div className="voucher-list-container">
                    <div className="voucher-list-banner">
                        <img src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/10/banner/Deal-ngon-tgdd1-1200x120-1.png" alt="voucher-list-banner" />
                    </div>
                    <VoucherList />
                </div> */}
                <div className="category-container">
                    <div className="category-container__main">
                        <h2>Danh mục sản phẩm</h2>
                        <div className="category-list">
                            <CategoryCard>
                                <FontAwesomeIcon className="category-card__icon" icon={faTabletScreenButton}/>
                                <p>Tablet</p>
                            </CategoryCard>
                            <CategoryCard>
                                <FontAwesomeIcon className="category-card__icon" icon={faMobileScreen}/>
                                <p>Điện thoại</p>
                            </CategoryCard>
                            <CategoryCard>
                                <FontAwesomeIcon className="category-card__icon" icon={faLaptop}/>
                                <p>Laptop</p>
                            </CategoryCard>
                            <CategoryCard>
                                <FontAwesomeIcon className="category-card__icon" icon={faComputer}/>
                                <p>PC</p>
                            </CategoryCard>
                            <CategoryCard>
                                <FontAwesomeIcon className="category-card__icon" icon={faTv}/>
                                <p>Tivi</p>
                            </CategoryCard>
                            <CategoryCard>
                                <FontAwesomeIcon className="category-card__icon" icon={faDesktop}/>
                                <p>Màn hình</p>
                            </CategoryCard>
                            <CategoryCard>
                                <FontAwesomeIcon className="category-card__icon" icon={faHardDrive}/>
                                <p>CPU</p>
                            </CategoryCard>
                            <CategoryCard>
                                <FontAwesomeIcon className="category-card__icon" icon={faKeyboard}/>
                                <p>Bàn phím, chuột</p>
                            </CategoryCard>
                            <CategoryCard>
                                <FontAwesomeIcon className="category-card__icon" icon={faHeadphonesSimple}/>
                                <p>Tai nghe</p>
                            </CategoryCard>
                        </div>
                    </div>
                    
                </div>
                <div className="voucher-container">
                    <div className="voucher-container__main">
                        <h2>Chương trình khuyến mãi</h2>
                        <div className="scroll" ref={scrollRef}>
                            <div className="voucher-container__list">
                                    <VoucherCard name={'vc 01'}/>
                                    <VoucherCard name={'vc 01'}/>
                                    <VoucherCard name={'vc 02'}/>
                                    <VoucherCard name={'vc 03'}/>
                                    <VoucherCard name={'vc 04'}/>
                                    <VoucherCard name={'vc 05'}/>
                                    <VoucherCard name={'vc 06'}/>
                                    <VoucherCard name={'vc 07'}/>
                                    <VoucherCard name={'vc 08'}/>
                                    <VoucherCard name={'vc 09'}/>
                                    <VoucherCard name={'vc 010'}/>
                                    <VoucherCard name={'vc 011'}/>
                                    <VoucherCard name={'vc 012'}/>
                            
                            </div>    
                        </div>
                        <button className="prev-btn" onClick={scrollPrev}>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </button>
                        <button className="next-btn" onClick={scrollNext}>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </button>
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
                                    numOfReview={product.numOfReview} />
                            ))}
                        </div>
                        {products.length >= page *10 && (
                            <div className="see-more-btn"><button onClick={seeMoreHandler}>Xem thêm &raquo;</button></div>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default HomePage;