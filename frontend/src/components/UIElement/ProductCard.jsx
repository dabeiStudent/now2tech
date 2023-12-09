import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import './ProductCard.css';
import { formatPrice } from '../../ultis/formatPrice';
import StarRating from '../../Pages/Product/components/StarRating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = props => {
    const [discount, setDiscount] = useState(null);
    useEffect(() => {
        if (props.voucher) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/voucher/get-voucher-by-name?vname=${props.voucher}`)
                .then(result => {
                    setDiscount(result.data);
                })
                .catch(err => {
                    toast(err);
                })
        }
    }, [])
    return (
        <NavLink className='product-link' to={`/chi-tiet-san-pham/${props.id}`}>
            <div className="product-card">
                <ToastContainer />
                <div className="product-img">
                    <img
                        src={props.image}
                        alt='place'
                        height={200}
                    />
                </div>
                <h3>{props.name}</h3>
                <div className="product-rating">
                    <StarRating rating={props.avgRating} />
                    <span className="num-rating">{props.numOfReview} đánh giá</span>
                </div>
                {discount != null
                    ? (<div className="product-card-price-div">
                        <strong className="product-price">{formatPrice((100 - discount.percent) * props.price / 100)} </strong>
                        <strong className="product-price-old">{formatPrice(props.price)} </strong>
                    </div>)
                    : <strong className="product-price">{formatPrice(props.price)}</strong>}
            </div>
        </NavLink>
    )
}

export default ProductCard;