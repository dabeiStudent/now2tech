import React from "react";
import { Link } from "react-router-dom";
const ProductCard = props => {
    return (
        <div className="card-container">
            <div>
                <img
                    src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/dark-souls/a/a5/3xCuCoK.jpg'
                    alt='place'
                    height={200}
                />
            </div>
            <div className="desc">
                <h2>
                    <Link to={`/${props.product._id}`}>{props.product.name}</Link>
                </h2>
                <h3>{props.product.desc}</h3>
                <p>{props.product.sellPrice + "VND"}</p>
            </div>
        </div>
    )
}

export default ProductCard;