import React from 'react';
import { useNavigate } from 'react-router-dom';

import './SearchItem.css';
import StarRating from "../../Pages/Product/components/StarRating";
import { formatPrice } from '../../ultis/formatPrice';

const SearchItem = props => {
    const navigate= useNavigate();

    const seeDetailHandler= ()=> {
        navigate(`/chi-tiet-san-pham/${props.id}`);
        props.gotoProductHandle();
    }

    return (
        <div className='search-item' onClick={seeDetailHandler}>
            <div className='search-item__img'>
                <img src={props.image} alt="product" />
            </div>
            <div className='search-item__info'>
                <p>{props.name}</p>
                <StarRating rating={props.rating}/>
                <span className='price'>{formatPrice(props.price)}</span>
            </div>
        </div>
    )
}

export default SearchItem