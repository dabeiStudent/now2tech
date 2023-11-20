import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailModal from "./DetailModal";
import AddProduct from "./AddProduct";
import UpdateProductModal from "./UpdateProductModal";
import Loader from '../../../components/UIElement/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductsContent.css';
import UploadModal from "./UploadModal";
import AddCategory from "./AddCategory";
import AddBrand from "./AddBrand";

const ProductsContent = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [showAddCate, setShowAddCate] = useState(false);
    const [showAddBrand, setShowAddBrand] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [productId, setProductId] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [products, setProduct] = useState([{
        _id: '',
        sku: '',
        name: '',
        importPrice: '',
        sellPrice: '',
        pimage: [],
        desc: '',
        tags: [],
        release: '',
        made: '',
        brand: '',
        category: '',
        specs: [],
        voucher: [],
        inStock: ''
    }]);
    useEffect(() => {
        axios.get("http://localhost:5000/product/get-all-admin", { withCredentials: true })
            .then(result => {
                setProduct(result.data);
            })
    }, [deleteProduct, showAdd, showUpdate, showUpload]);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const filterProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
    })
    const handleEdit = (product) => {
        setShowUpdate(true);
        setSelectedProduct(product);
        console.log(product)
    };
    const closeUpdateModal = event => {
        setShowUpdate(false);
        setSelectedProduct(null);
    }
    const handleRemove = (productId) => {
        console.log(`Remove product with ID ${productId}`);
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            axios.delete(`http://localhost:5000/product/remove-product/${productId}`, { withCredentials: true })
                .then((res) => {
                    toast('Xóa thành công');
                    setDeleteProduct(!deleteProduct);
                })
                .catch((err) => {
                    console.log({ err: err });
                })
        }
    };
    const openAddModal = () => {
        setShowAdd(true);
    }
    const closeAddModal = () => {
        setShowAdd(false);
        setSelectedProduct(null);
    }
    const openAddCateModal = () => {
        setShowAddCate(true);
    }
    const closeAddCateModal = () => {
        setShowAddCate(false);
    }
    const openAddBrandModal = () => {
        setShowAddBrand(true);
    }
    const closeAddBrandModal = () => {
        setShowAddBrand(false);
    }
    const openDetailModal = (product) => {
        setShowDetail(true);
        setSelectedProduct(product);
    }

    const closeDetailModal = () => {
        setShowDetail(false);
        setSelectedProduct(null);
    }
    const openUploadModal = (pid) => {
        setShowUpload(true);
        setProductId(pid);
    }
    const closeUploadModal = e => {
        setShowUpload(false);
        setProductId(null);
    }
    return (
        <React.Fragment>
            <ToastContainer />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm tên sản phẩm/sku"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="product-content">
                <div className="button-product-content">
                    <button onClick={openAddCateModal} className="add-product-button">Tạo danh mục</button>
                    <button onClick={openAddBrandModal} className="add-product-button">Thêm thương hiệu</button>
                    <button onClick={openAddModal} className="add-product-button">Thêm sản phẩm</button>
                </div>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr >
                                <th>Mã SKU</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá nhập</th>
                                <th>Giá bán</th>
                                <th>Ảnh sản phẩm</th>
                                <th>Nơi sản xuất</th>
                                <th>Hãng</th>
                                <th>Danh mục</th>
                                <th>Tồn kho</th>
                                <th>Đã bán</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterProducts.map((product) => (
                                <tr key={product._id} className="product-row">
                                    <td className="product-cell">{product.sku}</td>
                                    <td className="product-cell">{product.name}</td>
                                    <td className="product-cell">{product.importPrice}</td>
                                    <td className="product-cell">{product.sellPrice}</td>
                                    <td className="product-cell">
                                        <img src={`http://localhost:5000/images/${product.pimage ? product.pimage[0] : 'chưa có'}`} />
                                    </td>
                                    <td className="product-cell">{product.made}</td>
                                    <td className="product-cell">{product.brand}</td>
                                    <td className="product-cell">{product.category}</td>
                                    <td className="product-cell">{product.inStock}</td>
                                    <td className="product-cell">{product.sold}</td>
                                    <td className="product-cell">
                                        <button className="detail-button" onClick={() => openDetailModal(product)}>Chi tiết</button>
                                        <button className="upload-button" onClick={() => openUploadModal(product._id)}>Thêm ảnh sản phẩm</button>
                                        <button className="edit-button" onClick={() => handleEdit(product)}>Cập nhật</button>
                                        <button className="remove-button" onClick={() => handleRemove(product._id)}>Xóa</button>
                                        {showDetail && selectedProduct && (
                                            <DetailModal product={selectedProduct} onClose={closeDetailModal} />
                                        )}
                                        {showUpdate && selectedProduct && (
                                            <UpdateProductModal product={selectedProduct} onClose={closeUpdateModal} />
                                        )}
                                        {showUpload && productId && (
                                            <UploadModal pid={productId} onClose={closeUploadModal} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showAdd && <AddProduct onClose={closeAddModal} />}
                    {showAddCate && <AddCategory onClose={closeAddCateModal} />}
                    {showAddBrand && <AddBrand onClose={closeAddBrandModal} />}
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductsContent;