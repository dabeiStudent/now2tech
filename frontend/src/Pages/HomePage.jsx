import React, { useEffect, useState } from "react";
import axios from "axios";

import BigBanner from "../components/UIElement/BigBanner";
import ProductCard from "../components/UIElement/ProductCard";
import { Slider } from "../components/UIElement/Slider";

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

    const productList = products.map((product, k) => <ProductCard product={product} key={k} />);
    return (
        <div>
            <BigBanner/>
            <Slider/>
            {/* <div className="product-list">{productList}</div> */}
        </div>
    )
}

export default HomePage;