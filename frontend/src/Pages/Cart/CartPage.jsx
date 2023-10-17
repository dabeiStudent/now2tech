import React, { useContext, useState, useEffect } from 'react';
import {Form, Button} from 'react-bootstrap';

import './CartPage.css';
import Item from './components/Item';
// import UserInfo from './components/UserInfo';
import { CartContext } from '../../ultis/cartContext';
import { formatPrice } from '../../ultis/formatPrice';

const CartPage = () => {
  const cart= useContext(CartContext);
  const [selectedItems, setSelectedItems]= useState([]);
  const [selectAll, setSelectAll]= useState(false);

  const selectAllHandler= ()=> {
    if(selectAll){
      setSelectedItems([]);
    } else{
      setSelectedItems(cart.items)
    }
    setSelectAll(!selectAll);
  }

  const checkboxChangeHandler= (e)=>{
    const itemInCart= cart.items.find(item=> item.id === e.target.value);
    setSelectAll(false)
    if(selectedItems.includes(itemInCart)){
      setSelectedItems(selectedItems.filter(item=> item.id !== itemInCart.id))
    } else {
      setSelectedItems([...selectedItems, itemInCart])
    }
  }

  useEffect(()=>{
    if(cart.items.length === selectedItems.length){
      setSelectAll(true);
    }
  }, [selectedItems, cart.items.length]);
  
  return (
    <div className='cart-page'>
        <div className='cart-page__main'>
            <p className='cart-page__title'>Giỏ hàng của bạn:</p>
            <div className='cart-page__list-item'>
              <Form className='list-item__form'>
                <Form.Check className='custom-checkbox' label='Chọn tất cả' onChange={selectAllHandler} checked={selectAll} value={'select-all'} name="item" inline />
                { cart.items.length > 0 && cart.items.map(item=> (
                  <div className='list-item__single-item' key={item.id}>
                    <Form.Check checked={selectedItems.includes(item)} onChange={checkboxChangeHandler} className='custom__check-box' value={item.id} name='item' aria-label='option'/>
                    <Item id={item.id} name={item.name} price={item.price} qty={item.qty}/>
                  </div>
                  
                ))}
              </Form>   
            </div>
            <div className='total-cost'>
                <span>Tạm tính ({selectedItems.reduce((acc, current)=> acc + current.qty, 0)} sản phẩm):</span>
                <span>{formatPrice(selectedItems.reduce((acc, current)=> acc + current.qty * current.price, 0))}</span>
            </div>
            <div className='cart-page__btn'>
              <Button className='cart-page__custom-btn' variant='danger' disabled={selectedItems.length === 0}>ĐẶT HÀNG</Button>
            </div>
            {/* <UserInfo/> */}
            
        </div>
    </div>
  )
}

export default CartPage