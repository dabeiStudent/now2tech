import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faMobileScreen,
    faLaptopCode, 
    faTabletScreenButton, 
    faHeadphones,
    faDesktop} from '@fortawesome/free-solid-svg-icons'

import './MainMenu.css';

const MainMenu = () => {
  return (
    <ul className='main-menu'>
        <li>
            <FontAwesomeIcon className='main-menu__icon' icon={faMobileScreen}/>
            <span>Điện thoại</span>
        </li>
        <li>
            <FontAwesomeIcon className='main-menu__icon' icon={faLaptopCode}/>
            <span>Laptop</span>
        </li>
        <li>
            <FontAwesomeIcon className='main-menu__icon' icon={faTabletScreenButton}/>
            <span>Tablet</span>
        </li>
        <li>
            <FontAwesomeIcon className='main-menu__icon' icon={faDesktop}/>
            <span>PC, màn hình</span>
        </li>
        <li>
            <FontAwesomeIcon className='main-menu__icon' icon={faHeadphones}/>
            <span>Phụ kiện</span>
        </li>
    </ul>
  )
}

export default MainMenu