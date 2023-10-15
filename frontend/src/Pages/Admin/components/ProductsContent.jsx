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
    //         _id: "6515975dd9c38ff42671e4aa",
    //         sku: "GHESKU03",
    //         name: "Day la ghe test",
    //         importPrice: 1000000,
    //         sellPrice: 1500000,
    //         pimage: "Chua co dau",
    //         desc: "Test mot xiu",
    //         tags: [
    //             "#test,#testXiuxiu"
    //         ],
    //         release: "2023-09-27T17:00:00.000Z",
    //         made: "VietNam",
    //         brand: "Logitech",
    //         category: "Chair",
    //         specs: [
    //             {
    //                 stype: "CPU",
    //                 sdetail: "i31115G43GHz",
    //                 _id: "6524c988c3fa66aea51a9bbe"
    //             },
    //             {
    //                 stype: "RAM",
    //                 sdetail: "4 GBDDR4 (Onboard 4 GB +1 khe rời)2400 MHz",
    //                 _id: "6524c988c3fa66aea51a9bbf"
    //             },
    //             {
    //                 stype: "Ổ cứng",
    //                 sdetail: "256 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 1 TB)Hỗ trợ khe cắm HDD SATA (nâng cấp tối đa 2 TB)",
    //                 _id: "6524c988c3fa66aea51a9bc0"
    //             },
    //             {
    //                 stype: "Màn hình",
    //                 sdetail: "15.6 Full HD (1920 x 1080)",
    //                 _id: "6524c988c3fa66aea51a9bc1"
    //             }
    //         ],
    //         vouchers: [
    //             "6515830fad463952f0d8d86c"
    //         ],
    //         inStock: null,
    //         __v: 2
    //     },]
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
                                <td className="product-cell">
                                    {product.specs.map(spec => (
                                        <tr key={spec._id}>
                                            <td>{spec.stype}</td>
                                            <td>{spec.sdetail}</td>
                                        </tr>))}
                                </td>
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