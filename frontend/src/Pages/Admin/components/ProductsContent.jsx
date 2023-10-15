import React, { useEffect, useState } from "react";


import './ProductsContent.css';
import axios from "axios";
const ProductsContent = () => {
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
        specs: [{}],
        vouchers: [],
        inStock: ''
    }]);
    useEffect(() => {
        axios.get("http://localhost:5000/product/get-all-admin", { withCredentials: true })
            .then(result => {
                setProduct(result.data);
                console.log(result.data)
            })
    }, []);
    // const products = [
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     {
    //         _id: '1',
    //         sku: 'SKU001',
    //         name: 'Product 1',
    //         importPrice: 10.0,
    //         sellPrice: 15.0,
    //         pimage: 'product1.jpg',
    //         desc: 'Product 1 description',
    //         tags: ['tag1', 'tag2'],
    //         release: '2023-01-01',
    //         made: 'Country 1',
    //         brand: 'Brand 1',
    //         category: 'Category 1',
    //         specs: ['Spec 1', 'Spec 2'],
    //         vouchers: ['Voucher 1', 'Voucher 2'],
    //         inStock: 100,
    //     },
    //     // Add more product data as needed
    // ];
    const handleEdit = (productId) => {
        // Xử lý khi nút "Edit" được nhấn
        console.log(`Edit product with ID ${productId}`);
    };

    const handleRemove = (productId) => {
        // Xử lý khi nút "Remove" được nhấn
        console.log(`Remove product with ID ${productId}`);
    };
    return (
        <div className="product-content">
            <button className="add-product-button">Add Product</button>
            <div className="table-container">
                <table className="product-table">
                    <thead>
                        <tr >
                            <th>_id</th>
                            <th>sku</th>
                            <th>name</th>
                            <th>importPrice</th>
                            <th>sellPrice</th>
                            <th>pimage</th>
                            <th>desc</th>
                            <th>tags</th>
                            <th>release</th>
                            <th>made</th>
                            <th>brand</th>
                            <th>category</th>
                            <th>specs</th>
                            <th>vouchers</th>
                            <th>inStock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="product-row">
                                <td className="product-cell">{product._id}</td>
                                <td className="product-cell">{product.sku}</td>
                                <td className="product-cell">{product.name}</td>
                                <td className="product-cell">{product.importPrice}</td>
                                <td className="product-cell">{product.sellPrice}</td>
                                <td className="product-cell">{product.pimage}</td>
                                <td className="product-cell">{product.desc}</td>
                                <td className="product-cell">{product.tags}</td>
                                <td className="product-cell"> {product.release}</td>
                                <td className="product-cell">{product.made}</td>
                                <td className="product-cell">{product.brand}</td>
                                <td className="product-cell">{product.category}</td>
                                {product.specs.map((stype, sdetail) => (
                                    <td key={stype} className="product-cell">
                                        {/* Hiển thị thông tin từ đối tượng spec */}
                                        {`Spec ${stype}: ${sdetail}`}
                                    </td>
                                ))}
                                <td className="product-cell">{product.vouchers}</td>
                                <td className="product-cell">{product.inStock}</td>
                                <td className="product-cell">
                                    <button className="edit-button" onClick={() => handleEdit(product._id)}>Edit</button>
                                    <button className="remove-button" onClick={() => handleRemove(product._id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductsContent;