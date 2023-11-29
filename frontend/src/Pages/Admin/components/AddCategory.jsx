import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddCategory.css';
import './AddProduct.css';

const AddCategory = ({ onClose }) => {
    const [categories, setCategories] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        keyword: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const filterCategories = categories.filter((category) => {
        return (
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    })
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/category/get-category`)
            .then(result => {
                setCategories(result.data);
            })
            .catch(err => {
                toast('Có lỗi khi hiển thị');
            })
    }, [isUpdate]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/category/add-category`, newCategory, { withCredentials: true })
            .then(result => {
                setNewCategory({
                    name: '',
                    keyword: ''
                });
                setIsUpdate(!isUpdate);
            })
            .catch(err => {
                if (err == "AxiosError: Request failed with status code 400") {
                    toast("Đã có danh mục này");
                } else {
                    toast(err);
                }
            })
    }
    const handleRemove = (categoryId) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/category/delete-category/${categoryId}`, { withCredentials: true })
            .then(result => {
                setIsUpdate(!isUpdate);
            })
            .catch(err => {
                toast(err);
            });
    }
    return (
        <div className='add-product-modal'>
            <ToastContainer />
            <div className="product-modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Thêm Danh Mục</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="sku">Tên danh mục:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newCategory.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sku">Từ khóa: </label>
                        <input
                            type="text"
                            id="keyword"
                            name="keyword"
                            value={newCategory.keyword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Lưu danh mục</button>
                </form>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tên danh mục"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="table-cate">
                    <h2>Danh sách Danh Mục</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên danh mục</th>
                                <th>Từ khóa</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterCategories.map(category => (
                                <tr key={category._id}>
                                    <td>{category.name}</td>
                                    <td>{category.keyword}</td>
                                    <td>
                                        <button className="remove-button" onClick={() => handleRemove(category._id)}>Xóa</button>
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

export default AddCategory;