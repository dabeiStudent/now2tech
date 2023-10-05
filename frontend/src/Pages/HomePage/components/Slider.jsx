import React from 'react';
import { Carousel} from 'react-bootstrap';

import './Slider.css';

export const Slider = () => {
  return (
    <Carousel indicators={false}>
      <Carousel.Item>
        <div className='carousel-item__all'>
            <div className='carousel-item__part'>
                <img src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/10/banner/DH-Ty-Ty-720-220-720x220.png"/>
            </div>
            <div className='carousel-item__part'>
                <img src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/10/banner/Mua-kem-720-220-720x220-1.png'/>
            </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='carousel-item__all'>
            <div className='carousel-item__part'>
                <img src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/09/banner/SPDQ-720-220-720x220-2.png'/>
            </div>
            <div className='carousel-item__part'>
                <img src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/09/banner/C51-720-220-720x220-2.png'/>
            </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='carousel-item__all'>
            <div className='carousel-item__part'>
                <img src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/09/banner/Xiaomi-13T-720-220-720x220.png'/>
            </div>
            <div className='carousel-item__part'>
                <img src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/09/banner/A38-A58-720-220-720x220-2.png'/>
            </div>
        </div>
      </Carousel.Item>
    </Carousel>
  )
}
