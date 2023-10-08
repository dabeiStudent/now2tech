import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';

import './DescComponent.css';

const DescComponent = () => {
    const [isShow, setShow]= useState(false);

    const handleShow= () => setShow(true);

    const handleClose= () => setShow(false);

    return (
        <div className='desc-container'>
            <h2>Thông tin sản phẩm</h2>
            <div className='desc-container__details'>
                <div className='desc-container__short-content'>
                    Lý do chọn mua iPhone 15 series tại Thế Giới Di Động
                    Thế Giới Di Động là một trong những nhà bán lẻ điện thoại di động lớn nhất Việt Nam, cung cấp đa dạng các sản phẩm iPhone 15 chính hãng với mức giá cạnh tranh. Dưới đây là một số lý do khiến bạn nên chọn mua iPhone 15 tại Thế Giới Di Động:
                    • Chất lượng sản phẩm: Thế Giới Di Động cam kết cung cấp sản phẩm iPhone 15 chính hãng. Điều này giúp bạn yên tâm về chất lượng sản phẩm và được hưởng đầy đủ các quyền lợi bảo hành của Apple.
                    • Ưu đãi và khuyến mãi: Thế Giới Di Động thường xuyên có các chương trình khuyến mãi, giảm giá và tặng quà kèm theo, giúp bạn tiết kiệm chi phí khi mua sắm.
                    • Hệ thống cửa hàng rộng rãi: Thế Giới Di Động có mạng lưới cửa hàng rộng khắp trên toàn quốc, giúp bạn dễ dàng tìm kiếm và mua sắm. Bạn cũng có thể trải nghiệm sản phẩm trực tiếp tại cửa hàng và nhận sự hỗ trợ từ nhân viên.
                    • Dịch vụ hậu mãi tốt: Thế Giới Di Động cung cấp dịch vụ hậu mãi chuyên nghiệp, bao gồm bảo hành, sửa chữa và hỗ trợ kỹ thuật giúp bạn yên tâm khi sử dụng sản phẩm.
                    • Hệ thống trả góp linh hoạt: Thế Giới Di Động cung cấp các lựa chọn trả góp phù hợp với ngân sách của bạn, giúp bạn mua được sản phẩm mong muốn mà không cần thanh toán toàn bộ số tiền một lúc.
                    • Uy tín và kinh nghiệm: Với hơn 15 năm hoạt động trên thị trường, Thế Giới Di Động đã xây dựng được một uy tín mạnh mẽ trong ngành công nghiệp điện thoại di động. Điều này giúp bạn yên tâm khi mua sắm tại đây.
                    • Dịch vụ mua sắm trực tuyến: Ngoài các hệ thống cửa hàng siêu thị, Thế Giới Di Động còn cung cấp dịch vụ mua sắm trực tuyến, giúp bạn mua hàng mọi lúc, mọi nơi và dễ dàng so sánh giá cả.
                </div>
                
                <div className='desc-container__bg'></div> 
                <div className='desc-containter__btn'>
                    <button onClick={handleShow}>Xem chi tiết...</button> 
                </div>      
            </div>
            <Modal
                dialogClassName='custom-modal'
                scrollable 
                size='lg'
                centered 
                show={isShow} 
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Thông tin sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Lý do chọn mua iPhone 15 series tại Thế Giới Di Động
                    Thế Giới Di Động là một trong những nhà bán lẻ điện thoại di động lớn nhất Việt Nam, cung cấp đa dạng các sản phẩm iPhone 15 chính hãng với mức giá cạnh tranh. Dưới đây là một số lý do khiến bạn nên chọn mua iPhone 15 tại Thế Giới Di Động:
                    • Chất lượng sản phẩm: Thế Giới Di Động cam kết cung cấp sản phẩm iPhone 15 chính hãng. Điều này giúp bạn yên tâm về chất lượng sản phẩm và được hưởng đầy đủ các quyền lợi bảo hành của Apple.
                    • Ưu đãi và khuyến mãi: Thế Giới Di Động thường xuyên có các chương trình khuyến mãi, giảm giá và tặng quà kèm theo, giúp bạn tiết kiệm chi phí khi mua sắm.
                    • Hệ thống cửa hàng rộng rãi: Thế Giới Di Động có mạng lưới cửa hàng rộng khắp trên toàn quốc, giúp bạn dễ dàng tìm kiếm và mua sắm. Bạn cũng có thể trải nghiệm sản phẩm trực tiếp tại cửa hàng và nhận sự hỗ trợ từ nhân viên.
                    • Dịch vụ hậu mãi tốt: Thế Giới Di Động cung cấp dịch vụ hậu mãi chuyên nghiệp, bao gồm bảo hành, sửa chữa và hỗ trợ kỹ thuật giúp bạn yên tâm khi sử dụng sản phẩm.
                    • Hệ thống trả góp linh hoạt: Thế Giới Di Động cung cấp các lựa chọn trả góp phù hợp với ngân sách của bạn, giúp bạn mua được sản phẩm mong muốn mà không cần thanh toán toàn bộ số tiền một lúc.
                    • Uy tín và kinh nghiệm: Với hơn 15 năm hoạt động trên thị trường, Thế Giới Di Động đã xây dựng được một uy tín mạnh mẽ trong ngành công nghiệp điện thoại di động. Điều này giúp bạn yên tâm khi mua sắm tại đây.
                    • Dịch vụ mua sắm trực tuyến: Ngoài các hệ thống cửa hàng siêu thị, Thế Giới Di Động còn cung cấp dịch vụ mua sắm trực tuyến, giúp bạn mua hàng mọi lúc, mọi nơi và dễ dàng so sánh giá cả.
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DescComponent
