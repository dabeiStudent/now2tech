import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Col, Row, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'

import './UserInfo.css';
import { OrderContext } from '../../../ultis/orderContext';
import { CartContext } from '../../../ultis/cartContext';

const UserInfo = () => {
    const navigate = useNavigate();
    const orderContext = useContext(OrderContext);
    const cartContext = useContext(CartContext);
    const [ordered, setOrdered] = useState();
    const [openModal, setOpenModal] = useState(false);

    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart.address === undefined) {
        const ad = {
            add: '',
            province_id: null,
            district_id: null,
            ward_id: null
        };
        cart.address = ad;
    };

    const [provinces, setProvinces]= useState([]);
    const [selectedProvince, setSelectedProvince]=useState(cart.address.province_id);

    const [districts, setDistrict] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(cart.address.district_id);

    const [wards, setWards]= useState([]);
    const [selectedWard, setSelectedWard]= useState(cart.address.ward_id);

    const [address, setAddress] = useState(cart.address.add);

    const [paymentMethod, setPaymentMethod] = useState('VNPAY');

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
    });

    const [updateInfo, setUpdateInfo] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const getUserInfo = async () => {
            await axios.get('http://localhost:5000/user/profile/my-profile', { withCredentials: true })
                .then(res => {
                    setUserInfo({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        phoneNumber: res.data.phoneNumber,
                        email: res.data.email
                    });
                    setUpdateInfo({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        phoneNumber: res.data.phoneNumber,
                        email: res.data.email
                    })
                })
                .catch(err => console.log(err));
        };
        getUserInfo();
    }, []);

    useEffect(()=>{
        // https://vapi.vnappmob.com/api/province
        const getListProvince= async()=> {
            await axios.get('https://provinces.open-api.vn/api/p/')
            .then(res=> setProvinces(res.data))
            .catch(err=> console.log(err));
        }
        getListProvince();
    }, []);

    useEffect(()=> {
        // https://vapi.vnappmob.com/api/province/district/${selectedProvince}
        const getListDistrict= async ()=>{
            await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
            .then(res=> setDistrict(res.data.districts))
            .catch(err=> console.log(err));
        }
        getListDistrict();
    }, [selectedProvince]);

    useEffect(()=> {
        const getListWard= async ()=> {
            await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
            .then(res=> setWards(res.data.wards))
            .catch(err=> console.log(err));
        }
        getListWard();
    }, [selectedDistrict]);

    const selectProvinceHandler = (e) => {
        setSelectedProvince(e.target.value);
    }

    const selectedDistrictHandler = (e) => {
        setSelectedDistrict(e.target.value);
    }

    const selectedWardHandler = (e) => {
        setSelectedWard(e.target.value);
    }

    const paymentMethodCheckedHandler = (e) => {
        setPaymentMethod(e.target.value)
    }

    const addressChangeHandler= (e)=> {
        setAddress(e.target.value);
    }

    if (orderContext.selectedItems.length === 0) {
        window.alert("Vui lòng chọn sản phẩm trước khi đặt hàng");
        navigate('/gio-hang');
    }

    const submitHandler = event => {
        event.preventDefault();

        if(selectedProvince === undefined
            || selectedProvince === 0
            || selectedDistrict === undefined 
            || selectedDistrict === 0
            || selectedWard === undefined 
            || selectedWard === 0
            || address === undefined
            || address === '') {
            return window.alert("Vui lòng nhập địa chỉ đặt hàng!");
        }

        const sprovince= provinces.find(p=> p.code.toString() === selectedProvince);
        const sdistrict= districts.find(d=> d.code.toString() === selectedDistrict);
        const sward= wards.find(w=> w.code.toString() === selectedWard);


        const add= address + ', ' + sward.name + ', ' + sdistrict.name + ', ' + sprovince.name;

        const a = { province_id: selectedProvince, district_id: selectedDistrict, ward_id: selectedWard, add: address }
        orderContext.setAddress(a);

        const createOrder = async () => {
            await axios.post('http://localhost:5000/order/create-order', {
                items: orderContext.selectedItems,
                address: add,
                paymentMethod: paymentMethod,
                price: orderContext.selectedItems.reduce((acc, current) => acc + current.price * current.qty, 0),
                shippingFee: 12000,
                totalPrice: orderContext.selectedItems.reduce((acc, current) => acc + current.price * current.qty, 0) + 12000
            }, { withCredentials: true })
                .then(res => {
                    cartContext.setCartItems(cartContext.items.filter(item => !orderContext.selectedItems.includes(item)));
                    setOrdered(res.data)
                })
                .catch(err => console.log(err))
        }
        createOrder();
    }


    useEffect(()=> {
        if(ordered !== undefined){
            if(ordered.paymentMethod === 'VNPAY' && ordered.paymentStatus.isPaid === false){
                const getVNPayUrl= async ()=> {
                    await axios.post(`http://localhost:5000/order/create-vnpay-url/${ordered._id}`)
                        .then(res => {
                            navigate(`/chi-tiet-don-hang/${ordered._id}`);
                            window.open(res.data)
                        })
                        .catch(err => console.log(err))
                }
                getVNPayUrl();
            } else {
                navigate(`/chi-tiet-don-hang/${ordered._id}`);
            }
        }
    }, [ordered, navigate])

    const openModalHandler = () => {
        setOpenModal(true);
    }

    const closeModalHandler = () => {
        setOpenModal(false);
        setUpdateInfo(userInfo);
    }

    const changeLastNameHandler = (e) => {
        setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
    }

    const changeFirstNameHandler = (e) => {
        setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
    }

    const changePhoneNumberHandler = (e) => {
        setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
    }

    const updateInfoHandler = async (e) => {
        e.preventDefault();
        await axios.put('http://localhost:5000/user/profile/update', updateInfo, { withCredentials: true })
            .then(res => {
                navigate(0);
            })
            .catch(err => {
                console.log(err)
            });
    }

  return (
    <div className='customer-info'>
        <Row>
            <Col><p className='form-title'>Thông tin khách hàng:</p></Col>
            <Col className='custom-col'>
                <button className='change-info__btn' onClick={openModalHandler}>
                    <FontAwesomeIcon icon={faPenToSquare}/>
                    <span>Thay đổi</span>
                </button>
            </Col>
        </Row>
        <Row>
            <Col lg={3}><span>Người nhận:</span></Col>
            <Col lg={9}><span className='isbold'>{userInfo.lastName} {userInfo.firstName}</span></Col>
        </Row>
        <Row>
            <Col lg={3}><span>Email:</span></Col>
            <Col lg={9}><span>{userInfo.email}</span></Col>
        </Row>
        <Row>
            <Col lg={3}><span>Số điện thoại:</span></Col>
            <Col lg={9}><span>{userInfo.phoneNumber}</span></Col>
        </Row>
        <Modal dialogClassName='modal-custom' show={openModal} onHide={closeModalHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin</Modal.Title>
            </Modal.Header>
            <Form onSubmit={updateInfoHandler}>
                <Modal.Body>
                    <Row className='custom-row'>
                        <Col lg={3}><span>Email:</span></Col>
                        <Col><span>{userInfo.email}</span></Col>
                    </Row>
                    <Row className='custom-row'>
                        <Form.Label column lg={3}>Họ:</Form.Label>
                        <Col>
                            <Form.Control onChange={changeLastNameHandler} name='lastName' type='text' defaultValue={userInfo.lastName} />
                        </Col>
                    </Row>
                    <Row className='custom-row'>
                        <Form.Label column lg={3}>Tên:</Form.Label>
                        <Col>
                            <Form.Control onChange={changeFirstNameHandler} name='firstName' type='text' defaultValue={userInfo.firstName}  />
                        </Col>
                    </Row>
                    <Row className='custom-row'>
                        <Form.Label column lg={3}>Điện thoại:</Form.Label>
                        <Col>
                            <Form.Control onChange={changePhoneNumberHandler} name='phoneNumber' type='text' pattern='[0-9]*' defaultValue={userInfo.phoneNumber}/>
                        </Col>
                    </Row>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={closeModalHandler}>Hủy</Button>
                    <Button variant='primary'type='submit' >Cập nhật</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        
        <Form>
            <div>
                <p className='form-title'>Địa chỉ nhận hàng:</p>
                <Row className='form-row'>
                    <Col>
                        <Form.Select onChange={selectProvinceHandler} value={selectedProvince !== null ? selectedProvince : 0}>
                            <option value={79}>Thành phố Hồ Chí Minh</option>
                            {provinces.map(p => (
                                <option value={p.code} key={p.code}>{p.name}</option>
                            ))}
                            
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select onChange={selectedDistrictHandler} value={selectedDistrict !== null ? selectedDistrict : 0}>
                            <option value={769} >Thành phố Thủ Đức</option>
                            {districts.map(d=>(
                                <option key={d.code} value={d.code}>{d.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select onChange={selectedWardHandler} value={selectedWard !== null ? selectedWard : 0}>
                            <option value={26815}>Phường Linh Chiểu</option>
                            {wards.map(ward=> (
                                <option key={ward.code} value={ward.code}>{ward.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className='form-row'>
                    <Form.Group className='custom-form__input'>
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control defaultValue={address} onChange={addressChangeHandler} type='text' required/>
                    </Form.Group>
                </Row>
            </div> 
            <p className='form-title'>Phương thức thanh toán</p>
            <Row className='form-row'>
                <Col>
                    <Form.Check value={'VNPAY'} onChange={paymentMethodCheckedHandler} checked={paymentMethod === 'VNPAY'} id='VNPAY' name='payment-method' type='radio' inline label='Thanh toán qua VNPay'/>
                </Col>
                <Col>
                    <Form.Check value={'COD'} onChange={paymentMethodCheckedHandler} checked={paymentMethod === 'COD'} id='COD' name='payment-method' type='radio' inline label='Thanh toán khi nhận hàng'/>
                </Col>                
            </Row>
            <button onClick={submitHandler} className='place-order-btn'>TIẾP THEO</button>  
        </Form>
        
    </div>
  )
}

export default UserInfo