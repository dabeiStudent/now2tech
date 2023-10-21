import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Col, Row } from 'react-bootstrap';

import './UserInfo.css';
import { OrderContext } from '../../../ultis/orderContext';

const UserInfo = () => {
    const orderContext= useContext(OrderContext);

    const [provinces, setProvince]= useState([]);
    const [selectedProvince, setSelectedProvince]=useState();

    const [districts, setDistrict]= useState([]);
    const [selectedDistrict, setSelectedDistrict]= useState();

    const [wards, setWards]= useState([]);
    const [selectedWard, setSelectedWard]= useState();

    const [getOderMethod, setGetOrderMethod]= useState('at-store');

    const [address, setAddress]= useState('');

    useEffect(()=>{
        const getListProvince= async()=> {
            await axios.get('https://vapi.vnappmob.com/api/province')
            .then(res=> setProvince(res.data.results))
            .catch(err=> console.log(err));
        }
        getListProvince();        
    }, []);

    useEffect(()=> {
        const getListDistrict= async ()=>{
            await axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedProvince}`)
            .then(res=> setDistrict(res.data.results))
            .catch(err=> console.log(err));
        }
        getListDistrict();
    }, [selectedProvince]);

    useEffect(()=> {
        const getListWard= async ()=> {
            await axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
            .then(res=> setWards(res.data.results))
            .catch(err=> console.log(err));
        }
        getListWard();
    }, [selectedDistrict]);

    const selectProvinceHandler= (e)=> {
        setSelectedProvince(e.target.value);
    }

    const selectedDistrictHandler= (e)=>{
        setSelectedDistrict(e.target.value);
    }

    const selectedWardHandler= (e)=> {
        setSelectedWard(e.target.value);
    }

    const getOrderMethodHandler= (e)=> {
        setGetOrderMethod(e.target.value);
    }

    const addressChangeHandler= (e)=> {
        setAddress(e.target.value);
    }

    const submitHandler= event => {
        event.preventDefault();
        const sprovince= provinces.find(p=> p.province_id === selectedProvince);
        const sdistrict= districts.find(d=> d.district_id === selectedDistrict);
        const sward= wards.find(w=> w.ward_id === selectedWard);

        const add= address + ', ' + sward.ward_name + ', ' + sdistrict.district_name + ', ' + sprovince.province_name;

        orderContext.setAddress(add);
        console.log(add);
    }


  return (
    <div className='customer-info'>
        <Form>
            <p className='form-title'>Thông tin khách hàng:</p>
            <Row className='form-row'>
                <Col>
                    <Form.Group className='custom-form__input'>
                        <Form.Label>Họ</Form.Label>
                        <Form.Control type='text' required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className='custom-form__input'>
                        <Form.Label>Tên</Form.Label>
                        <Form.Control type='text' required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='form-row'>
                <Col>
                    <Form.Group className='custom-form__input'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className='custom-form__input'>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type='text' pattern='[0-9]*' required/>
                    </Form.Group>
                </Col>
            </Row>
            <p className='form-title'>Cách thức nhận hàng</p>
            <Row className='form-row'>
                <Col>
                    <Form.Check checked={getOderMethod === 'at-store'} value={'at-store'} onChange={getOrderMethodHandler} id='at-store' name='get-order' type='radio' inline label='Nhận tại cửa hàng'/>
                </Col>
                <Col>
                    <Form.Check checked={getOderMethod === 'shipping'} value={'shipping'} onChange={getOrderMethodHandler} id='shipping' name='get-order' type='radio' inline label='Giao hàng tận nơi'/>
                </Col>                
            </Row>
            {getOderMethod === 'shipping' && (
                <div>
                    <p className='form-title'>Địa chỉ nhận hàng:</p>
                    <Row className='form-row'>
                        <Col>
                            <Form.Select onChange={selectProvinceHandler}   >
                                <option value="">Chọn tỉnh/thành phố</option>
                                {provinces.map(p => (
                                    <option value={p.province_id} key={p.province_id}>{p.province_name}</option>
                                ))}
                                
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select onChange={selectedDistrictHandler}>
                                <option >Chọn quận/huyện</option>
                                {districts.map(d=>(
                                    <option key={d.district_id} value={d.district_id}>{d.district_name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select onChange={selectedWardHandler}>
                                <option>Chọn phường/xã</option>
                                {wards.map(ward=> (
                                    <option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className='form-row'>
                        <Form.Group className='custom-form__input'>
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control value={address} onChange={addressChangeHandler} type='text' required/>
                        </Form.Group>
                    </Row>
                </div> 
            )}                      
            <p className='form-title'>Phương thức thanh toán</p>
            <Row className='form-row'>
                <Col>
                    <Form.Check id='paypal' name='payment-method' type='radio' inline label='Thanh toán qua Paypal'/>
                </Col>
                <Col>
                    <Form.Check id='cod' name='payment-method' type='radio' inline label='Thanh toán khi nhận hàng'/>
                </Col>                
            </Row>
            <button onClick={submitHandler} className='place-order-btn'>TIẾP THEO</button>  
        </Form>
        
    </div>
  )
}

export default UserInfo