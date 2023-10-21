import React from 'react';

import './Shipping.css';
import UserInfo from './components/UserInfo';

const Shipping = () => {

  return (
    <div className='shipping-page'>
        <div className='shipping-page__main'>
            <UserInfo/>
        </div>
    </div>
  )
}

export default Shipping