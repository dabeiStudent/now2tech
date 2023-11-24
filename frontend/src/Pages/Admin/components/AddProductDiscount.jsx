import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

import './AddProductDiscount.css';
import Loader from '../../../components/UIElement/Loader';

const AddProductDiscount = props => {
    const [isOpenModal, setIsOpenModal]= useState(false);
    const [products, setProducts]= useState();
    const [selectedProduct, setSelectedProduct]= useState([]);

    const closeModalHandler= ()=> {
        setSelectedProduct([]);
        setIsOpenModal(false);
    }

    const openModalHandler= ()=> {
        setIsOpenModal(true);
    }

    useEffect(()=> {
        const getListProduct= async ()=> {
            await axios.get(`http://localhost:5000/voucher/get-product-for-voucher/${props.voucherId}`, { withCredentials: true })
            .then(res=> setProducts(res.data))
            .catch(err=> console.log(err))
        }
        getListProduct();
    }, [props.voucherId]);

    const checkboxChangeHandler = (e) => {
        if (selectedProduct.includes(e.target.value)) {
          setSelectedProduct(selectedProduct.filter(item => item !== e.target.value))
        } else {
          setSelectedProduct([...selectedProduct, e.target.value])
        }
    };

    const addProductsHandler= (e)=> {
        e.preventDefault();
        const addProducts= async ()=> {
            await axios.put(`http://localhost:5000/voucher/add-product-to-voucher/${props.voucherId}`,
            { products: selectedProduct }, { withCredentials: true })
            .then(res=> {
                closeModalHandler();
                toast('Thành công');
            })
            .catch(err=> console.log(err))
        }
        addProducts();
    }

    return (
        <div>
            <div className="button-product-content">
                <button className="edit-button" onClick={openModalHandler}>Thêm sản phẩm</button>
            </div>
            <Modal dialogClassName='modal-custom' show={isOpenModal} onHide={closeModalHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm khuyến mãi</Modal.Title>
                </Modal.Header>
                <Form onSubmit={addProductsHandler}>
                    <Modal.Body>
                        {(products && products.length !== 0) ? (
                            <div className='voucher_row'>
                                <label>Danh sách sản phẩm</label>
                                <span>Đã chọn: {selectedProduct.length} sản phẩm</span>
                                <ul className='product-list__choose'>
                                    {products.map(product=> (
                                        <li key={product._id} className='product-list__option'>
                                            <input type="checkbox" value={product._id} onChange={checkboxChangeHandler} />
                                            <div className='image'>
                                                <img src={`http://localhost:5000/images/${product.pimage[0]}`} alt="product" />
                                            </div>
                                            <div className='prod-info'>
                                                <p>{product.name}</p>
                                            </div>
                                        </li>
                                    ))}
                                    
                                </ul>                            
                            </div>
                        ) : (<Loader/>)}
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={closeModalHandler}>Hủy</Button>
                        {selectedProduct.length !== 0 ? (
                            <Button variant='primary'type='submit'>Thêm</Button>
                        ) : (
                            <Button disabled variant='primary'type='submit'>Thêm</Button>
                        )}
                        
                    </Modal.Footer>
                </Form>
            </Modal>
            </div>
    )
}

export default AddProductDiscount