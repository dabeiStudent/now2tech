import React from "react";

import './DetailModal.css';
const DetailModal = ({ product, onClose }) => {
    if (!product) {
        return null;
    }

    return (
        <div className="detail-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Chi tiết sản phẩm</h2>
                <div className="table-container">
                    <table className="product-details">
                        <tbody>
                            <tr>
                                <td>Sku:</td>
                                <td>{product.sku}</td>
                            </tr>
                            <tr>
                                <td>Tên sản phẩm:</td>
                                <td>{product.name}</td>
                            </tr>
                            <tr>
                                <td>Giá nhập:</td>
                                <td>{product.importPrice}</td>
                            </tr>
                            <tr>
                                <td>Giá bán:</td>
                                <td>{product.sellPrice}</td>
                            </tr>
                            <tr>
                                <td>Ảnh sản phẩm:</td>
                                <td>{product.pimage}</td>
                            </tr>
                            <tr>
                                <td>Mô tả:</td>
                                <td>{product.desc}</td>
                            </tr>
                            <tr>
                                <td>Tags:</td>
                                <td>{product.tags.join(', ')}</td>
                            </tr>
                            <tr>
                                <td>Ngày phát hành:</td>
                                <td>{product.release}</td>
                            </tr>
                            <tr>
                                <td>Xuất xứ:</td>
                                <td>{product.made}</td>
                            </tr>
                            <tr>
                                <td>Thương hiệu:</td>
                                <td>{product.brand}</td>
                            </tr>
                            <tr>
                                <td>Danh mục:</td>
                                <td>{product.category}</td>
                            </tr>
                            <tr>
                                <td>Số lượng trong kho:</td>
                                <td>{product.inStock}</td>
                            </tr>
                            <tr>
                                <td>Thông số kỹ thuật:</td>
                                <td>
                                    <ul>
                                        {product.specs.map((spec, index) => (
                                            <li key={index}>{spec.stype}: {spec.sdetail}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>Vouchers:</td>
                                <td>
                                    <ul>
                                        {product.vouchers.map((voucher, index) => (
                                            <li key={index}>{voucher}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="backdrop" onClick={onClose}></div>
        </div>
    );
};

export default DetailModal