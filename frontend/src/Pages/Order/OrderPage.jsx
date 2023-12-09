import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

import './OrderPage.css';
import OrderItem from './components/OrderItem';
import { formatPrice } from '../../ultis/formatPrice';
import Loader from '../../components/UIElement/Loader';
import { AuthContext } from '../../ultis/authContext';

const OrderPage = () => {
  const authContext= useContext(AuthContext);
  let { oid } = useParams();
  const [order, setOrder] = useState();
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/get-order/${oid}`, { withCredentials: true })
      .then(res => setOrder(res.data))
      .catch(err => {
        alert(err);
      });
  }, [oid, isReload]);

  const paymentHandler = () => {
    const getVNPayUrl = async () => {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/order/create-vnpay-url/${order._id}`)
        .then(res => {
          window.open(res.data)
        })
        .catch(err => console.log(err))
    }
    getVNPayUrl();
  };

  const cancelOrderHandler = () => {
    const cancelOrder = async () => {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/order/cancel-order/${order._id}`, {}, { withCredentials: true })
        .then(res => {
          toast(res.data.msg);
          setIsReload(!isReload)
        })
        .catch(err => console.log(err))
    }
    cancelOrder();
  }

  const confirmDelivered = () => {
    const isConfirmed = window.confirm('Bạn chắc chắn đã nhận được hàng?');

    const updateOrder = async () => {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/order/update-to-delivered/${order._id}`, {}, { withCredentials: true })
        .then(res => {
          toast(res.data.msg);
          setIsReload(!isReload)
        })
        .catch(err => console.log(err))
    }

    if (isConfirmed) {
      updateOrder();
    }
  }

  return (
    <div>
      {order ? (
        <div className='order-page'>
          <div className='order-page__top' >
            <h2>Chi tiết đơn hàng: #{order._id}</h2>
          </div>

          <div className='address-container'>
            <p className='order-page__title'>Thông tin nhận hàng:</p>
            <Row>
              <Col lg={3}><span>Người nhận:</span></Col>
              <Col lg={9}><span>{order.user.lastName} {order.user.firstName}</span></Col>
            </Row>
            <Row>
              <Col lg={3}><span>Điện thoại:</span></Col>
              <Col lg={9}><span>{order.user.phoneNumber}</span></Col>
            </Row>
            <Row>
              <Col lg={3}><span>Email: </span></Col>
              <Col lg={9}><span>{order.user.email}</span></Col>
            </Row>
            <Row>
              <Col lg={3}><span>Địa chỉ: </span></Col>
              <Col lg={9}><span>{order.address}</span></Col>
            </Row>

          </div>
          <div className='order-container'>
            <p className='order-page__title'>Thông tin đơn hàng:</p>
            <Row>
              <Col lg={3}><span>Trạng thái:</span></Col>
              {order.status === 'Not_proccessed' ? (<Col lg={9}><span>Chờ xác nhận</span></Col>)
                : (order.status === 'Processing' ? (<Col lg={9}><span>Đang xử lý</span></Col>)
                  : (order.status === 'Shipped' ? (<Col lg={9}><span>Đang giao</span></Col>)
                    : (order.status === 'Delivered' ? (<Col lg={9}><span>Đã giao</span></Col>)
                      : (<Col lg={9}><span>Đã hủy</span></Col>))))}
            </Row>
            <Row>
              <Col lg={3}><span>Phương thức thanh toán:</span></Col>
              <Col lg={9}><span>{order.paymentMethod}</span></Col>
            </Row>
            <Row>
              <Col lg={3}><span>Trạng thái thanh toán:</span></Col>
              {order.paymentStatus.isPaid === true ?
                (<Col lg={9}><span>Đã thanh toán {order.paymentStatus.paidAt}</span></Col>)
                : (<Col lg={9}><span>Chưa thanh toán</span></Col>)}

            </Row>
          </div>
          <div className='detail-container'>
            <p className='order-page__title'>Thông tin sản phẩm:</p>
            <ul className='list-order-item'>
              {order.items.map(item => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  qty={item.qty}
                  image={item.image}
                  price={item.price}
                  orderStatus={order.status}
                  isReload={isReload}
                  setIsReload={setIsReload}
                  username={authContext.username} />))
              }
            </ul>
            <div className='detail-container__fees'>
              <Row>
                <Col lg={4}><span>Tổng ({order.items.reduce((acc, current) => acc + current.qty, 0)} sản phẩm): </span></Col>
                <Col className='custom-col' lg={8}><span>{formatPrice(order.price)}</span></Col>
              </Row>
              <Row>
                <Col lg={4}><span>Phí giao hàng: </span></Col>
                <Col className='custom-col' lg={8}><span>{formatPrice(order.shippingFee)}</span></Col>
              </Row>
              <Row>
                <Col lg={4}><span>Tổng cộng: </span></Col>
                <Col className='custom-col' lg={8}><span>{formatPrice(order.totalPrice)}</span></Col>
              </Row>

              {order.paymentMethod === 'VNPAY' && order.status !== 'Cancelled' && order.paymentStatus.isPaid === false && (
                <Row className='payment-btn'>
                  <button onClick={paymentHandler}>Thanh toán với VNPAY</button>
                </Row>
              )}
              {order.status === 'Not_proccessed' && (
                <Row className='cancel-btn'>
                  <button onClick={cancelOrderHandler}>HỦY ĐẶT HÀNG</button>
                </Row>
              )}
              {order.status === 'Shipped' && (
                <Row className='delivered-btn'>
                  <button onClick={confirmDelivered}>ĐÃ NHẬN ĐƯỢC HÀNG</button>
                </Row>
              )}


            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}

    </div>




  )
}

export default OrderPage