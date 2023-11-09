import React, { useState } from 'react';

import './AddProduct.css';
import axios from 'axios';
const AddProduct = ({ onClose }) => {
    const [product, setProduct] = useState({
        sku: '',
        name: '',
        importPrice: '',
        sellPrice: '',
        pimage: '',
        desc: '',
        tags: [],
        release: '',
        made: '',
        brand: '',
        category: '',
        specs: [],
        voucher: [],
        inStock: '',
        sold: 0
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const addSpec = () => {
        const newSpec = { stype: '', sdetail: '' };
        setProduct({ ...product, specs: [...product.specs, newSpec] });
    };

    const handleSpecChange = (index, field, value) => {
        const updatedSpecs = [...product.specs];
        updatedSpecs[index][field] = value;
        setProduct({ ...product, specs: updatedSpecs });
    };

    const removeSpec = (index) => {
        const updatedSpecs = [...product.specs];
        updatedSpecs.splice(index, 1);
        setProduct({ ...product, specs: updatedSpecs });
    };

    const handleImageChange = (e) => {
        const selectedImages = e.target.files;
        // selectedImages là một mảng chứa các tệp ảnh đã chọn

        // Xử lý các tệp ảnh ở đây (ví dụ: tải lên, hiển thị trước khi lưu, vv.)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/product/add-new-product", product, { withCredentials: true })
            .then(result => {
                alert("Thêm sản phẩm thành công")
                setProduct({
                    sku: '',
                    name: '',
                    importPrice: '',
                    sellPrice: '',
                    pimage: '',
                    desc: '',
                    tags: [],
                    release: '',
                    made: '',
                    brand: '',
                    category: '',
                    specs: [],
                    voucher: [],
                    inStock: '',
                    sold: 0
                });
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className='add-product-modal'>
            <div className="product-modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Thêm Sản Phẩm</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="sku">SKU:</label>
                        <input
                            type="text"
                            id="sku"
                            name="sku"
                            value={product.sku}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Tên sản phẩm:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="importPrice">Giá nhập sản phẩm:</label>
                        <input
                            type="number"
                            id="importPrice"
                            name="importPrice"
                            value={product.importPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sellPrice">Giá bán sản phẩm:</label>
                        <input
                            type="number"
                            id="sellPrice"
                            name="sellPrice"
                            value={product.sellPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="desc">Chi tiết sản phẩm:</label>
                        <input
                            type="text"
                            id="desc"
                            name="desc"
                            value={product.desc}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="tags">Tags:</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={product.tags}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="release">Ngày bán:</label>
                        <input
                            type="date"
                            id="release"
                            name="release"
                            value={product.release}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="made">Nơi sản xuất:</label>
                        <input
                            type="text"
                            id="made"
                            name="made"
                            value={product.made}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="brand">Thương hiệu:</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={product.brand}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category">Danh mục:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="inStock">Số lượng:</label>
                        <input
                            type="number"
                            id="inStock"
                            name="inStock"
                            value={product.inStock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="images">Thêm ảnh sản phẩm</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            onChange={handleImageChange}
                            multiple
                            accept="image/*"
                        />
                    </div>
                    <div>
                        <h3>Thông số kỹ thuật (Specs)</h3>
                        {product.specs.map((spec, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Loại"
                                    value={spec.stype}
                                    onChange={(e) => handleSpecChange(index, 'stype', e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Chi tiết"
                                    value={spec.sdetail}
                                    onChange={(e) => handleSpecChange(index, 'sdetail', e.target.value)}
                                    required
                                />
                                <button type="button" onClick={() => removeSpec(index)}>
                                    Xóa
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addSpec}>
                            Thêm
                        </button>
                    </div>
                    <button type="submit">Lưu sản phẩm</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;