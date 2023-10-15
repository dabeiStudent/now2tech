import React from "react";
import { NavLink } from "react-router-dom";
import './ProductCard.css';
const ProductCard = props => {
    return (
        <NavLink to={`/chi-tiet-san-pham/${props.id}`}>
            <div className="product-card">
                <div className="product-image">
                    <img
                        src='https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg'
                        alt='place'
                        height={200}
                    />
                </div>
                <h3>{props.name}</h3>
                <div className="product-prods-group">
                    <ul>
                        <li className="active">256GB</li>
                        <li>512GB</li>
                        <li>1TB</li>
                    </ul>

                </div>
                <strong className="product-price">{props.price}</strong>
            </div>

        </NavLink>

    )
}

export default ProductCard;