import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddProduct.css';
import axios from 'axios';
const AddProduct = ({ onClose }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [brands, setBrand] = useState([]);
    const [product, setProduct] = useState({
        sku: '',
        name: '',
        importPrice: '',
        sellPrice: '',
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
    useEffect(() => {
        axios.get('http://localhost:5000/category/get-category')
            .then(result => {
                setCategories(result.data);
            })
            .catch(err => {
                toast('Có lỗi khi hiển thị');
            })
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };
    const handleChangeCate = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        setSelectedCategory(value);
        setBrand([]);
    }
    const handleChangeBrand = (e) => {
        axios.get(`http://localhost:5000/brand/get-brand-cate/${selectedCategory}`)
            .then(result => {
                console.log(result.data)
                setBrand(result.data);
            })
            .catch(err => {
                toast(err);
            })
    }
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
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/product/add-new-product", product, { withCredentials: true })
            .then(result => {
                toast("Thêm sản phẩm thành công")
                setProduct({
                    sku: '',
                    name: '',
                    importPrice: '',
                    sellPrice: '',
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
                if (err.response) {
                    // Nếu có phản hồi từ máy chủ và mã lỗi không phải 2xx
                    console.error("Server error response:", err.response.data);
                    toast(`Lỗi: Sản phẩm đã tồn tại`);
                } else if (err.request) {
                    // Nếu có yêu cầu nhưng không có phản hồi
                    console.error("No response received:", err.request);
                    toast("Không nhận được phản hồi từ máy chủ");
                } else {
                    // Xử lý lỗi khác
                    console.error("Error:", err.message);
                    toast(`Lỗi: ${err.message}`);
                }
            })
    };

    return (
        <div className='add-product-modal'>
            <ToastContainer />
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
                        <label htmlFor="category">Danh mục:</label>
                        <select
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChangeCate}
                            required
                        >
                            <option value="" disabled>Chọn danh mục</option>
                            {categories.map(category => (
                                <option key={category._id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand">Thương hiệu:</label>
                        <select
                            id="brand"
                            name="brand"
                            value={product.brand}
                            onClick={handleChangeBrand}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Chọn thương hiệu</option>
                            {brands.map(brand => (
                                <option key={brand._id} value={brand.name}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
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