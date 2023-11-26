import React from "react";

import './DetailModal.css';
import { NavLink } from "react-router-dom";
const DetailModal = ({ product, onClose }) => {
    if (!product) {
        return null;
    }

    return (
        <div className="detail-modal-product">
            <div className="modal-body">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Chi tiết sản phẩm</h2>
                <div className="modal-body__table">
                    <table className="product-details">
                        <tbody>
                            <tr>
                                <td>Link trên shop:</td>
                                <td>
                                    <NavLink to={`/chi-tiet-san-pham/${product._id}`}>Xem tại đây</NavLink>
                                </td>
                            </tr>
                            <tr>
                                <td>ID:</td>
                                <td>{product._id}</td>
                            </tr>
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
                                <td>
                                    {product.pimage && product.pimage.map((imageName, index) => (
                                        <img key={index} src={`http://localhost:5000/images/${imageName}`} alt={`Image ${index + 1}`} className="product-image" />
                                    ))}
                                </td>
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
                                    {product.voucher}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DetailModal