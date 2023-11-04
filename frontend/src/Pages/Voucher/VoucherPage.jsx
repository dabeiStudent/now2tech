import React from 'react';

import './VoucherPage.css';
import ProductCard from '../../components/UIElement/ProductCard';
const VoucherPage = () => {
    let name= 'Test voucher UI'
    console.log(name)
  return (
    <div className='voucher-page'>
        <div className='voucher-page__container'>
            <div className='voucher-page__banner'>
                <div className='voucher-detail'>
                    <div className='voucher-detail__title'>
                        <h2>GIẢM 1 TRIỆU KHI THANH TOÁN IPHONE 15 SERIES BẰNG THẺ TÍN DỤNG EXIMBANK</h2>
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
                    <ProductCard name={name}/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>
                <div className='product-card__custom'>
                    <ProductCard/>
                </div>

                
                
               
            </div>
        </div>
    </div>
  )
}

export default VoucherPage