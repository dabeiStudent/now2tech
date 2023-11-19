import React from "react";
import { NavLink } from "react-router-dom";

import './ProductCard.css';
import { formatPrice } from '../../ultis/formatPrice';
import StarRating from '../../Pages/Product/components/StarRating';

const ProductCard = props => {
    return (
        <NavLink to={`/chi-tiet-san-pham/${props.id}`}>
            <div className="product-card">
                <div className="product-image">
                    <img
                        src={`http://localhost:5000/images/${props.image}`}
                        alt='place'
                        height={200}
                    />
                </div>
                <h3>{props.name}</h3>
                <div className="product-rating">
                    <StarRating rating={props.avgRating} />
                    <span className="num-rating">{props.numOfReview} đánh giá</span>
                </div>
                {/* <div className="product-prods-group">
                    <ul>
                        <li className="active">256GB</li>
                        <li>512GB</li>
                        <li>1TB</li>
                    </ul>

                </div> */}
                <strong className="product-price">{formatPrice(props.price)}</strong>
            </div>

        </NavLink>

    )
}

export default ProductCard;