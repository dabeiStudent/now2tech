import React from 'react';

import './CartPage.css';
import Item from './components/Item';
import UserInfo from './components/UserInfo';

const CartPage = () => {
  return (
    <div className='cart-page'>
        <div className='cart-page__main'>
            <p className='cart-page__title'>Giỏ hàng của bạn:</p>
            <div className='cart-page__list-item'>
                <Item/>
                <Item/>
            </div>
            <div className='total-cost'>
                <span>Tạm tính (3 sản phẩm):</span>
                <span>10.300.000đ</span>
            </div>
            <UserInfo/>
            
        </div>
    </div>
  )
}

export default CartPage