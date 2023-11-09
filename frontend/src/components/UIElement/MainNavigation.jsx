import React from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import MainMenu from './MainMenu';
import './MainNavigation.css'

const MainNavigation = () => {
  return (
    <MainHeader>
      <div className='main-navigation'>
        <div className='main-navigation__title'>
          <Link to="/">now2tech</Link>
        </div>
        <NavLinks/>
      </div>
      {/* <MainMenu/> */}
    </MainHeader>
  )
}

export default MainNavigation