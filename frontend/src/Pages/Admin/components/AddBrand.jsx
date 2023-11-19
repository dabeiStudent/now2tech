import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const AddBrand = ({ onClose }) => {
    const [newBrand, setNewBrand] = useState({
        name: '',
        category: ''
    });
    const [brands, setBrand] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/category/get-category')
            .then(result => {
                setCategories(result.data);
            })
            .catch(err => {
                alert('Có lỗi khi hiển thị');
            })
    }, [onClose])

    useEffect(() => {
        axios.get('http://localhost:5000/brand/get-brand')
            .then(result => {
                setBrand(result.data);
            })
            .catch(err => {
                alert(err);
            })
    }, [isUpdate])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBrand({ ...newBrand, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/brand/add-brand', newBrand, { withCredentials: true })
            .then(result => {
                setNewBrand({
                    name: '',
                    category: ''
                });
                setIsUpdate(!isUpdate);
            })
            .catch(err => {
                if (err == "AxiosError: Request failed with status code 401") {
                    alert("Đã có thương hiệu này trong danh mục bạn chọn");
                } else {
                    alert(err);
                }
            })
    }
    const handleRemove = (brandId) => {
        axios.delete(`http://localhost:5000/brand/remove-brand/${brandId}`, { withCredentials: true })
            .then(result => {
                setIsUpdate(!isUpdate);
            })
            .catch(err => {
                alert(err);
            })
    }
    return (
        <div className='add-product-modal'>
            <div className="product-modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Thêm Thương Hiệu</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="sku">Tên thương hiệu:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newBrand.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sku">Danh mục: </label>
                        <select
                            id="category"
                            name="category"
                            value={newBrand.category}
                            onChange={handleChange}
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
                    <button type="submit">Lưu danh mục</button>
                </form>
                <div className="table-cate">
                    <h2>Danh sách Thương Hiệu</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên thương hiệu</th>
                                <th>Danh mục</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map(brand => (
                                <tr key={brand._id}>
                                    <td>{brand.name}</td>
                                    <td>{brand.category}</td>
                                    <td>
                                        <button className="remove-button" onClick={() => handleRemove(brand._id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AddBrand;