import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <footer>
        <div className='footer__top'>
            <div className='footer-column'>
                <ul>
                    <li><strong>VỀ CHÚNG TÔI</strong></li>
                    <li>Tổng quan về Now2Tech.com</li>
                    
                </ul>
            </div>
            <div className='footer-column'>
                <ul>
                    <li><strong>CHÍNH SÁCH & DỊCH VỤ</strong></li>
                    <li>Tích điểm quà tặng VIP</li>
                    <li>Chính sách bảo hành</li>
                    <li>Hướng dẫn mua hàng</li>
                    <li>Cảnh báo giả mạo</li>
                </ul>
            </div>
            <div className='footer-column'> 
                <ul>
                    <li>
                        <strong>TỔNG ĐÀI HỖ TRỢ </strong>&#40;miễn phí gọi&#41;
                    </li>
                    <li>Khiếu nại: <span>1800.xxxx</span> &#40;8:00 - 21:00&#41; </li>
                    <li>Bảo hành: <span>1800.xxxx</span> &#40;8:00 - 21:00&#41;</li>
                </ul>
            </div>
            <div className='footer-column'>
                <ul>
                    <li><strong>THÔNG TIN KHÁC</strong></li>
                </ul>
            </div>
        </div>
        <div className='footer__bottom'>
            <p>&copy; 2023 Copyright: Now2Tech.com</p>
            
        </div>        
    </footer>
  )
}

export default Footer
