import React, { useEffect, useState } from "react";
import axios from "axios";

import BigBanner from "./components/BigBanner";
import ProductCard from "../../components/UIElement/ProductCard";
import VoucherList from "./components/VoucherList";
import { Slider } from "./components/Slider";
// import Footer from "../../components/UIElement/Footer";

import './HomePage.css'
const HomePage = () => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/product/get-all-product")
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div>
            <BigBanner />
            <div className="home-page-container">
                <Slider />
                <div className="voucher-list-container">
                    <div className="voucher-list-banner">
                        <img src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/10/banner/Deal-ngon-tgdd1-1200x120-1.png" alt="voucher-list-banner" />
                    </div>
                    <VoucherList />
                </div>
                <div className="all-product-container">
                    <p className="all-product-container__title">TẤT CẢ SẢN PHẨM</p>
                    <div className="all-product-container__prod-list">
                        {products.map(product => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.sellPrice} />
                        ))}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default HomePage;