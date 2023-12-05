import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import './CartPage.css';
import Item from './components/Item';
import { CartContext } from '../../ultis/cartContext';
import { formatPrice } from '../../ultis/formatPrice';
import getCookie from '../../ultis/getCookie';
import { OrderContext } from '../../ultis/orderContext';
import Loader from '../../components/UIElement/Loader';

const CartPage = () => {
  const cart = useContext(CartContext);
  const orderContext = useContext(OrderContext);
  const [items, setItems]= useState([]);
  const [combineData, setCombineData]= useState([]);
  const [isEmpty,setIsEmpty]= useState(true);
  
  const usernameEncoded = getCookie('username');
  const username = decodeURIComponent(usernameEncoded);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  let products = cart.items.map(item=> item.id);;
  useEffect (()=> {
    if(cart.items.length !== 0){
      setIsEmpty(false);
    }
  }, []);

  useEffect(()=> {
    const getData= async ()=> {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/get-product-in-cart`, { params: {products: products} })
      .then(res=>{
        setItems(res.data)})
      .catch(err=> console.log(err))
    };
    getData();
  },[]);

  useEffect(()=> {
    const updateData= items.map(item=> {
      const itemInCart= cart.items.find(i=> i.id === item._id);
      if(itemInCart){
        return {
          ...item,
          qty: itemInCart.qty
        }
      }
      return;
    });
    setCombineData(updateData)
   
  }, [items, cart.items]);

  console.log(combineData);
  const selectAllHandler = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(combineData)
    }
    setSelectAll(!selectAll);
  }

  const checkboxChangeHandler = (e) => {
    console.log(e.target.value)
    const itemInCart = combineData.find(item => item._id === e.target.value);
    console.log(itemInCart)
    setSelectAll(false)
    if (selectedItems.includes(itemInCart)) {
      setSelectedItems(selectedItems.filter(item => item._id !== itemInCart._id))
    } else {
      setSelectedItems([...selectedItems, itemInCart])
    }
  }

  useEffect(() => {
    if (cart.items.length === selectedItems.length) {
      setSelectAll(true);
    }
  }, [selectedItems, cart.items.length]);

  const placeOrderHandler = async () => {
    if (username !== 'false') {
      orderContext.setSelectedItems(selectedItems);
      navigate('/thong-tin-giao-hang')
    } else {
      toast("Vui lòng đăng nhập để mua hàng");
    }
  }

  return (
    <div className='cart-page'>
      <ToastContainer />
      <div className='cart-page__main'>
        <p className='cart-page__title'>Giỏ hàng của bạn:</p>
        {cart.items.length === 0 ? (
          <div className='cart-empty'>
            <FontAwesomeIcon className='cart-plus__icon' icon={faCartPlus} />
            <p>Giỏ hàng của bạn đang trống</p>
            <NavLink to="/">Quay về trang chủ</NavLink>
          </div>
        ) : (
          <div>
            <div className='cart-page__list-item'>
              {combineData ? (
                <Form className='list-item__form'>
                  <Form.Check className='custom-checkbox' label='Chọn tất cả' onChange={selectAllHandler} checked={selectAll} value={'select-all'} name="item" inline />
                  {combineData.map(item => (
                    <div className='list-item__single-item' key={item._id}>
                      <Form.Check value={item._id} checked={selectedItems.includes(item)} onChange={checkboxChangeHandler} className='custom__check-box'  name='item' aria-label='option' />
                      <Item
                        id={item._id} 
                        name={item.name} 
                        qty={item.qty} 
                        sellPrice={item.sellPrice} 
                        price={item.price} 
                        discountValid={item.discountValid} 
                        discountPercent={item.discountPercent}
                        discountId={item.discountId}
                        voucher={item.voucher} 
                        image={item.image} />
                    </div>
                  ))}
                </Form>
              ) : (
                <Loader/>
              )}
              
            </div>
            <div className='total-cost'>
            
              <span>Tạm tính ({selectedItems.reduce((acc, current) => acc + current.qty, 0)} sản phẩm):</span>
              <span>{formatPrice(selectedItems.reduce((acc, current) => acc + (current.vouchers ? ((current.price * (100 - current.vouchers.percent) / 100) * current.qty) : (current.price * current.qty)), 0))}</span>
            </div>
            <div className='cart-page__btn'>
              <Button onClick={placeOrderHandler} className='cart-page__custom-btn' variant='danger' disabled={selectedItems.length === 0}>ĐẶT HÀNG</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage