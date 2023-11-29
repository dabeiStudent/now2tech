import React, { useContext } from 'react';

import './Shipping.css';
import UserInfo from './components/UserInfo';
import { OrderContext } from '../../ultis/orderContext';
import SelectedItem from './components/SelectedItem'

const Shipping = () => {
  const orderContext = useContext(OrderContext);

  console.log(orderContext.selectedItems)
  return (
    <div className='shipping-page'>
      <div className='shipping-page__main'>
        <div className='list-item'>
          <h3>Sản phẩm:</h3>
          {orderContext.selectedItems.map(item => (
            <SelectedItem key={item._id} name={item.name} qty={item.qty} price={item.price} sellPrice={item.sellPrice} image={item.image} />
          ))}

        </div>
        <div className='shipping-page__info'>
          <UserInfo />
        </div>

      </div>
    </div>
  )
}

export default Shipping