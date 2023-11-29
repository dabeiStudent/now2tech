import React from 'react';
import { Carousel } from 'react-bootstrap';

import './ProductCarousel.css';

const ProductCarousel = props => {
    return (
        <div className='product-carousel'>
        
            <Carousel interval={null} >
                {props.images.map(image=> (
                    <Carousel.Item key={image}>
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/images/${image}`} alt="product" />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default ProductCarousel;
