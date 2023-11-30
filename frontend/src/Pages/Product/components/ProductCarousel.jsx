import React from 'react';
import { Carousel } from 'react-bootstrap';

import './ProductCarousel.css';

const ProductCarousel = props => {
    return (
        <div className='product-carousel'>
        
            <Carousel interval={null} >
                {props.images.map((image, index)=> (
                    <Carousel.Item key={index}>
                        <img src={image} alt="product" />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default ProductCarousel;
