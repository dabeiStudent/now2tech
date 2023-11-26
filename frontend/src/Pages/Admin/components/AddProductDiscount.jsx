import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

import './AddProductDiscount.css';
import Loader from '../../../components/UIElement/Loader';

const AddProductDiscount = props => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsOf, setProductsOf] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [flag, setFlag] = useState(false);
    const closeModalHandler = () => {
        setSelectedProduct([]);
        setIsOpenModal(false);
    }

    const openModalHandler = () => {
        setIsOpenModal(true);
    }

    useEffect(() => {
        const getListProduct = async () => {
            await axios.get(`http://localhost:5000/voucher/get-product-for-voucher`, { withCredentials: true })
                .then(res => setProducts(res.data))
                .catch(err => console.log(err))
        }
        getListProduct();
    }, [props.voucherId, flag]);
    useEffect(() => {
        const getListProduct = async () => {
            await axios.get(`http://localhost:5000/voucher/get-product-of-voucher/${props.voucherId}`, { withCredentials: true })
                .then(res => setProductsOf(res.data))
                .catch(err => console.log(err))
        }
        getListProduct();
    }, [props.voucherId, flag]);
    const checkboxChangeHandler = (e) => {
        if (selectedProduct.includes(e.target.value)) {
            setSelectedProduct(selectedProduct.filter(item => item !== e.target.value))
        } else {
            setSelectedProduct([...selectedProduct, e.target.value])
        }
    };

    const addProductsHandler = (e) => {
        e.preventDefault();
        const addProducts = async () => {
            await axios.put(`http://localhost:5000/voucher/add-product-to-voucher/${props.voucherId}`,
                { products: selectedProduct }, { withCredentials: true })
                .then(res => {
                    toast('Thành công');
                    setSelectedProduct([])
                    setFlag(!flag);
                })
                .catch(err => console.log(err))
        }
        addProducts();
    }
    const removeItem = (productId) => {
        axios.put(`http://localhost:5000/voucher/remove-product-from-voucher/${productId}`, '', { withCredentials: true })
            .then(result => {
                toast('Đã xóa thành công');
                setFlag(!flag);
            })
            .catch(err => {
                toast("Có lỗi xảy ra");
                console.log(err);
            })
    }
    return (
        <div>
            <div className="button-product-content">
                <button className="remove-button" onClick={openModalHandler}>Thêm sản phẩm</button>
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
                                    {products.map(product => (
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
                        ) : (<div className='voucher_row'>
                            <label>Danh sách sản phẩm</label>
                            <span>Đã chọn: {selectedProduct.length} sản phẩm</span>
                            <ul className='product-list__choose'>
                                <h3>Không có sản phẩm phù hợp</h3>
                            </ul>
                        </div>)}
                        <div className='voucher_row'>
                            <label>Danh sách sản phẩm của khuyến mãi này</label>
                            <ul className='product-list__choose'>
                                {productsOf.map(product => (
                                    <li key={product._id} className='product-list__option'>
                                        <div className='image'>
                                            <img src={`http://localhost:5000/images/${product.pimage[0]}`} alt="product" />
                                        </div>
                                        <div className='prod-info'>
                                            <p>{product.name}</p>
                                        </div>
                                        <div>
                                            <input type="button" className='remove-button' onClick={() => removeItem(product._id)} value="Xóa" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={closeModalHandler}>Hủy</Button>
                        {selectedProduct.length !== 0 ? (
                            <Button variant='primary' type='submit'>Thêm</Button>
                        ) : (
                            <Button disabled variant='primary' type='submit'>Thêm</Button>
                        )}

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default AddProductDiscount