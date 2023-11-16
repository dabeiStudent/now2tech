import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './VoucherPage.css';
import ProductCard from '../../components/UIElement/ProductCard';
import { formatDate } from '../../ultis/formatDate';
import Loader from '../../components/UIElement/Loader';

const VoucherPage = () => {
    let {vid}= useParams();
    const [voucher, setVoucher]= useState();

    useEffect(()=> {
        const getVoucher= async (req, res)=> {
            await axios.get(`http://localhost:5000/voucher/get-voucher/${vid}`)
            .then(res=> setVoucher(res.data))
            .catch(err=> console.log(err));
        }
        getVoucher();
    }, [vid]);
    return (
        <div className='voucher-page'>
            {voucher ? (
                <div className='voucher-page__container'>
                    <div className='voucher-page__banner'>
                        <div className='voucher-detail'>
                            <div className='voucher-detail__title'>
                                <h2>{voucher.name}</h2>
                            </div>
                            <div className='voucher-detail__desc'>
                                <div className='desc-container'>
                                    <h2>Thông tin khuyến mãi</h2>
                                    <p>
                                        <span>Thời gian diễn ra: </span>
                                        <span>Từ {formatDate(voucher.start)} đến {formatDate(voucher.end)} </span>
                                    </p>
                                    <p>Phần trăm khuyến mãi: {voucher.percent}%</p>
                                    <p>{voucher.desc}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='voucher-page__product-list'>
                        <div className='product-card__custom'>
                            {voucher.productList.map(product=> (
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    price={product.sellPrice}
                                    avgRating={product.avgRating}
                                    numOfReview={product.numOfReview}/>
                            ))}
                        </div>                    
                    </div>
                </div>
            ) : (
                <Loader/>
            )}
            
        </div>
    )
}

export default VoucherPage