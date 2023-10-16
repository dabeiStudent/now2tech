import React, { useContext } from 'react';
import {Form} from 'react-bootstrap';

import './CartPage.css';
import Item from './components/Item';
import UserInfo from './components/UserInfo';
import { CartContext } from '../../ultis/cartContext'

const CartPage = () => {
  const cart= useContext(CartContext);
  
  return (
    <div className='cart-page'>
        <div className='cart-page__main'>
            <p className='cart-page__title'>Giỏ hàng của bạn:</p>
            <div className='cart-page__list-item'>
              <Form className='list-item__form'>
                <Form.Check label='Chọn tất cả' name="item" inline />
                { cart.items.length > 0 && cart.items.map(item=> (
                  <Item key={item.id} id={item.id} name={item.name} price={item.price} qty={item.qty}/>
                ))}
              </Form>
                
                
            </div>
            <div className='total-cost'>
                <span>Tạm tính ({cart.items.reduce((acc, current)=> acc + current.qty, 0)} sản phẩm):</span>
                <span>{cart.items.reduce((acc, current)=> acc + current.qty * current.price, 0)}</span>
            </div>
            <UserInfo/>
            
        </div>
    </div>
  )
}

export default CartPage