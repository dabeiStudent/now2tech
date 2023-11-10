import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './VoucherPage.css';
import ProductCard from '../../components/UIElement/ProductCard';

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
                                    <h2>Thể lệ chương trình</h2>
                                    <p>Khuyến mại giảm giá 1.000.000 VNĐ khi khách hàng mua sản phẩm iPhone 15 series và thanh toán thành công qua thẻ tín dụng UOB
                                        Thông tin Khách Hàng trên đơn hàng phải trùng khớp với thông tin thẻ thanh toán. Trường hợp thông tin không trùng khớp, CellphoneS có quyền từ chối giao dịch.
                                        Mỗi Khách Hàng chỉ được tham gia 01 lần ưu đãi (01 máy) trong suốt thời gian diễn ra chương trình khuyến mại.
                                    
                                    </p>
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
                <div>loading...</div>
            )}
            
        </div>
    )
}

export default VoucherPage