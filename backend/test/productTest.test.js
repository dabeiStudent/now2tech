const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const jwt= require('jsonwebtoken');
const User= require('../models/usersModel');
const Product= require('../models/productsModel');
const Brand= require('../models/brandModel');
const Category= require('../models/categoryModel');

chai.use(chaiHttp);

describe('Product Controller', async()=> {
    let authToken;
    let productId;
    let catId;
    before(async function () {
        const user = new User({
            email: "producttest@gmail.com",
            passWord: "123",
            firstName: "Duong",
            lastName: "Le",
            phoneNumber: '0931272713',
            userName: 'dabeihihalatui'
        })
        await user.save();
        authToken = jwt.sign({
            uid: user._id,
            userName: user.userName,
            email: user.email,
            role: 'admin',
            image: user.image
        }, process.env.JWT_KEY, { expiresIn: 604800 });

        const newProduct= new Product({
            sku: "TESTSKU",
            name: "Test san pham",
            importPrice: 1400000,
            sellPrice: 1900000,
            desc: 'Rất bền',
            comment: ''
        });

        productId= newProduct._id;
        await newProduct.save();

        const newCategory= new Category({
            name: 'Máy ảnh',
            keyword: 'Máy ảnh'
        });

        catId= newCategory._id;
        await newCategory.save()
    });

    after(async function () {
        await User.deleteOne({ email: 'producttest@gmail.com' });
        await Product.deleteOne({_id: productId});
        await Category.deleteOne({_id: catId});
    });

    describe('Get all product', async()=> {
        it('Get all product', async()=> {
            await chai.request(server)
                .get(`/product/get-all-product`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                })
        })
    });
    
    describe('Get product in cart', async()=> {
        it('Get product in cart', async()=> {
            await chai.request(server)
                .get(`/product/get-product-in-cart`)
                .send({ products: [productId]})
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                })
        })
    });

    describe('Get all product by admin', async()=> {
        it('Get all product by admin', async()=> {
            await chai.request(server)
                .get(`/product/get-all-admin`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                })
        })
    });

    describe('Get good prouct', async()=> {
        it('Get good product', async()=> {
            await chai.request(server)
                .get(`/product/get-good-product`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                })
        })
    });

    describe('Get product max selling', async()=> {
        it('Get product max selling', async()=> {
            await chai.request(server)
                .get(`/product/get-max-selling`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                })
        })
    });

    describe('Get prouct by ID', async()=> {
        it('Get product by ID', async()=> {
            await chai.request(server)
                .get(`/product/get-product/${productId}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                })
        })
    });

    describe('Get prouct by brand and category', async()=> {
        it('Get product by brand', async()=> {
            await chai.request(server)
                .get(`/product/get-product-by/?category=${catId}&brand=All`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                })
        })
    });

    describe('Get prouct by price', async()=> {
        const minPrice=3000000;
        const maxPrice=5000000;
        it('Get product by price', async()=> {
            await chai.request(server)
                .get(`/product/get-product-by-price/?min=${minPrice}&max=${maxPrice}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                })
        })
    });

    describe('Add new product', async()=> {
        const addProduct= {
            sku: "SKUTEST01",
            name: "Test add product",
            importPrice: 1400000,
            sellPrice: 1900000,
            desc: 'Rất bền',
            comment: ''
        };

        after(async()=> {
            await Product.deleteOne({sku: addProduct.sku});
        });

        it('Add new product', async()=> {
            await chai.request(server)
                .post(`/product/add-new-product`)
                .set('Cookie', `utoken=${authToken}`)
                .send(addProduct)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Thêm sản phẩm thành công")
                })
        })
    });

    describe('Add specs for product', async()=> {
        it('Add specs for product', async()=> {
            await chai.request(server)
                .post(`/product/add-specs/${productId}`)
                .set('Cookie', `utoken=${authToken}`)
                .send({
                    specs: [
                        {
                            stype: 'CPU',
                            sdetail: 'i31215U1.2GHz'
                        },
                        {
                            stype: 'Màn hình',
                            sdetail: '15.6 Full HD'
                        },
                    ]
                })
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Thêm thành công")
                })
        })
    });

    describe('Upload image product', async()=> {
        it('Upload image product', async()=> {
            await chai.request(server)
                .put(`/product/upload-image-product/${productId}`)
                .set('Cookie', `utoken=${authToken}`)
                .set('Content-Type', 'multipart/form-data')
                .attach('files', './public/images/testimage.jpg', 'testimage.jpg')
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Upload thành công")
                })
        })
    });

    describe('Update product', async()=> {
        const updateProduct= {
            name: 'Updated name product',
            importPrice: 3500000,
            sellPrice: 3990000,
        }
        it('Update product', async()=> {
            await chai.request(server)
                .put(`/product/update-product/${productId}`)
                .set('Cookie', `utoken=${authToken}`)
                .send(updateProduct)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Cập nhật thành công")
                })
        })
    });

    describe('Update specs of product', async()=> {
        const specs= { stype: 'Màu sắc', sdetail: 'Đen' };
        it('Update specs of product', async()=> {
            await chai.request(server)
                .put(`/product/update-product/specs/${productId}`)
                .set('Cookie', `utoken=${authToken}`)
                .send(specs)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đã cập nhật thông số kỹ thuật")
                })
        })
    });

    describe('Add review for product', async()=> {
        let userToken;
        before(async()=> {
            const customer = new User({
                email: "customer@gmail.com",
                passWord: "123",
                firstName: "Thien",
                lastName: "Nguyen",
                phoneNumber: '0931272713',
                userName: 'nguyenvinhthien'
            })
            await customer.save();
            userToken = jwt.sign({
                uid: customer._id,
                userName: customer.userName,
                email: customer.email,
                role: 'user',
                image: customer.image
            }, process.env.JWT_KEY, { expiresIn: 604800 });
        });

        after(async()=> {
            await User.deleteOne({email: 'customer@gmail.com'})
        });

        it('Add review for product', async()=> {
            await chai.request(server)
                .post(`/product/add-review/${productId}`)
                .set('Cookie', `utoken=${userToken}`)
                .send({
                    comment: 'Test add review',
                    rating: 5
                })
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Thêm review thành công.")
                })
        })
    });

    describe('Delete product', async()=> {
        it('Delete product', async()=> {
            await chai.request(server)
                .delete(`/product/remove-product/${productId}`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Xoá sản phẩm thành công");
                })
        })
    })

})