import React from 'react';
import {Form} from 'react-bootstrap';

import './CartPage.css';
import Item from './components/Item';
import UserInfo from './components/UserInfo';

const CartPage = () => {
  const cart= localStorage.getItem("giohang") ? JSON.parse(localStorage.getItem("giohang")) : {items: []};

  return (
    <div className='cart-page'>
        <div className='cart-page__main'>
            <p className='cart-page__title'>Giỏ hàng của bạn:</p>
            <div className='cart-page__list-item'>
              <Form className='list-item__form'>
                <Form.Check label='Chọn tất cả' name="item" inline />
                { cart.items.length > 0 && cart.items.map(item=> (
                  <Item id={item.id} name={item.name} price={item.price} qty={item.qty}/>
                ))}
              </Form>
                
                
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