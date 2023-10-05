import React, { useEffect, useState } from "react";
import axios from "axios";

import BigBanner from "./components/BigBanner";
import ProductCard from "../../components/UIElement/ProductCard";
import ProductList from "./components/ProductList";
import { Slider } from "./components/Slider";

import './HomePage.css'
const HomePage = () => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/product/get-all-product")
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                window.alert("Không có sản phẩm");
            })
    }, []);

    // const productList = products.map((product, k) => <ProductCard product={product} key={k} />);
    return (
        <div>
            <BigBanner />
            <Slider />
            <div className="all-product-container">
                <p className="all-product-container__title">TẤT CẢ SẢN PHẨM</p>
                <div className="all-product-container__prod-list">
                    {products.map(product => (
                        <ProductCard
                            id={product._id}
                            name={product.name}
                            price={product.sellPrice} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage;