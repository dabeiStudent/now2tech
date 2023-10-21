import React, { useState } from "react";
import axios from "axios";


import './AddProduct.css';
const UpdateitemModal = ({ product, onClose }) => {
    const [item, setItem] = useState(product);
    if (!product) {
        return null;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    const addSpec = () => {
        const newSpec = { stype: '', sdetail: '' };
        setItem({ ...item, specs: [...item.specs, newSpec] });
    };

    const handleSpecChange = (index, field, value) => {
        const updatedSpecs = [...item.specs];
        updatedSpecs[index][field] = value;
        setItem({ ...item, specs: updatedSpecs });
    };

    const removeSpec = (index) => {
        const updatedSpecs = [...item.specs];
        updatedSpecs.splice(index, 1);
        setItem({ ...item, specs: updatedSpecs });
    };
    const handleUpdate = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/product/update-product/${item._id}`, item, { withCredentials: true })
            .then(result => {
                alert("Cập nhật thành công");
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='add-product-modal'>
            <div className="product-modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Thêm Sản Phẩm</h2>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="_id">ID:</label>
                        <input
                            type="text"
                            id="_id"
                            name="_id"
                            value={item._id}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="sku">SKU:</label>
                        <input
                            type="text"
                            id="sku"
                            name="sku"
                            value={item.sku}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Tên sản phẩm:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={item.name}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="importPrice">Giá nhập sản phẩm:</label>
                        <input
                            type="number"
                            id="importPrice"
                            name="importPrice"
                            value={item.importPrice}
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
                            value={item.sellPrice}
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
                            value={item.desc}
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
                            value={item.tags}
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
                            value={item.release}
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
                            value={item.made}
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
                            value={item.brand}
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
                            value={item.category}
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
                            value={item.inStock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <h3>Thông số kỹ thuật (Specs)</h3>
                        {item.specs.map((spec, index) => (
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
}

export default UpdateitemModal;