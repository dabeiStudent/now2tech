import React from 'react';

import './BigBanner.css';
import HomepageBanner from '../../../assets/background/HomeBanner.png';
import { NavLink } from 'react-router-dom';

const BigBanner = () => {
  return (
    <div className='big-banner'>
      <NavLink to="/">
        {/* <img src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/10/banner/BANNER-BIG-DESK-1920X450-1920x450.png'
          alt='big-banner' /> */}
        <img className='banner-img' src={HomepageBanner} alt="banner" />
        <div className="intro">
          <div className='text-box'>
            <h1 className='animated animatedFadeInUp fadeInUp shine'>Tech <br /> Gadgets</h1>
            <span>Let's discuss technology</span>
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default BigBanner