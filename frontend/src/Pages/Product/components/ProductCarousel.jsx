import React from 'react';
import { Carousel } from 'react-bootstrap';

import './ProductCarousel.css';

const ProductCarousel = ({ images }) => {
    return (
        // <div className='product-carousel'>
        //     {images.map(image => {
        //         <Carousel interval={null} >
        //             <Carousel.Item >
        //                 <img src={`https://localhost:5000/images/${image}`} alt="product" />
        //             </Carousel.Item>
        //             <Carousel.Item>
        //                 <img src="https://cdn.tgdd.vn/Products/Images/42/303891/Slider/vi-vn-iphone-15-plus-slider--(2).jpg" alt="product" />
        //             </Carousel.Item>
        //             <Carousel.Item>
        //                 <img src="https://cdn.tgdd.vn/Products/Images/42/303891/Slider/vi-vn-iphone-15-plus-slider--(4).jpg" alt="product" />
        //             </Carousel.Item>
        //         </Carousel>
        //     })}
        //  <div className='custom-indicators'>
        //     <div className='custom-indicator active'>
        //         <img src="https://cdn.tgdd.vn/Products/Images/42/303891/Slider/vi-vn-iphone-15-plus-slider--(8).jpg" alt="product" />
        //     </div>
        //     <div className='custom-indicator'>
        //         <img src="https://cdn.tgdd.vn/Products/Images/42/303891/Slider/vi-vn-iphone-15-plus-slider--(2).jpg" alt="product" />
        //     </div>
        //     <div className='custom-indicator'>
        //         <img src="https://cdn.tgdd.vn/Products/Images/42/303891/Slider/vi-vn-iphone-15-plus-slider--(9).jpg" alt="product" />
        //     </div>
        // </div>
        // </div>
        <div className="product-carousel">
            {images.map((image, index) => (
                <img key={index} src={`http://localhost:5000/images/${image}`} alt={`Product Image ${index}`} width="300px" height="200px" />
            ))}
        </div>
    )
}

export default ProductCarousel;
