import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailModal from "./DetailModal";
import AddProduct from "./AddProduct";
import UpdateProductModal from "./UpdateProductModal";


import './ProductsContent.css';

const ProductsContent = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [products, setProduct] = useState([{
        _id: '',
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
        inStock: ''
    }]);
    useEffect(() => {
        axios.get("http://localhost:5000/product/get-all-admin", { withCredentials: true })
            .then(result => {
                setProduct(result.data);
            })
    }, [deleteProduct, showAdd, showUpdate]);
    const handleEdit = (product) => {
        setShowUpdate(true);
        setSelectedProduct(product);
        console.log(product)
    };
    const closeUpdateModal = event => {
        event.preventDefault();
        setShowUpdate(false);
        setSelectedProduct(null);
    }
    const handleRemove = (productId) => {
        console.log(`Remove product with ID ${productId}`);
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            axios.delete(`http://localhost:5000/product/remove-product/${productId}`, { withCredentials: true })
                .then((res) => {
                    console.log('Xóa thành công');
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
    const openDetailModal = (product) => {
        setShowDetail(true);
        setSelectedProduct(product);
    }

    const closeDetailModal = () => {
        setShowDetail(false);
        setSelectedProduct(null);
    }
    return (
        <React.Fragment>
            <div className="product-content">
                <button onClick={openAddModal} className="add-product-button">Thêm sản phẩm</button>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr >
                                <th>sku</th>
                                <th>name</th>
                                <th>importPrice</th>
                                <th>sellPrice</th>
                                <th>pimage</th>
                                <th>made</th>
                                <th>brand</th>
                                <th>category</th>
                                <th>inStock</th>
                                <th>sold</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="product-row">
                                    <td className="product-cell">{product.sku}</td>
                                    <td className="product-cell">{product.name}</td>
                                    <td className="product-cell">{product.importPrice}</td>
                                    <td className="product-cell">{product.sellPrice}</td>
                                    <td className="product-cell">{product.pimage}</td>
                                    <td className="product-cell">{product.made}</td>
                                    <td className="product-cell">{product.brand}</td>
                                    <td className="product-cell">{product.category}</td>
                                    <td className="product-cell">{product.inStock}</td>
                                    <td className="product-cell">{product.sold}</td>
                                    <td className="product-cell">
                                        <button className="detail-button" onClick={() => openDetailModal(product)}>Chi tiết</button>
                                        <button className="edit-button" onClick={() => handleEdit(product)}>Cập nhật</button>
                                        <button className="remove-button" onClick={() => handleRemove(product._id)}>Xóa</button>
                                        {showDetail && selectedProduct && (
                                            <DetailModal product={selectedProduct} onClose={closeDetailModal} />
                                        )}
                                        {showUpdate && selectedProduct && (
                                            <UpdateProductModal product={selectedProduct} onClose={closeUpdateModal} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showAdd && <AddProduct onClose={closeAddModal} />}
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProductsContent;