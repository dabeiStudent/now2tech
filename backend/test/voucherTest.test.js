const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const jwt= require('jsonwebtoken');
const Voucher= require('../models/vouchersModel');
const User= require('../models/usersModel');
const Product= require('../models/productsModel');

chai.use(chaiHttp);

describe('Voucher Controller', ()=> {
    let voucherId;
    let productId;
    const currentDate= new Date();
    const end= new Date(currentDate.getTime() + 86400000);
    const newVoucher= {
            name: 'Test voucher',
            desc: 'Test Description',
            percent: 10,
            startDate: currentDate.toISOString(),
            endDate: end.toISOString()
    };

    let authToken;
    before(async function () {
        const user = new User({
            email: "vouchertest@gmail.com",
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

        const product = new Product({
            sku: "TESTSKU",
            name: "Test san pham",
            importPrice: 1400000,
            sellPrice: 1900000,
            desc: 'Rất bền',
            comment: ''
        });
        productId= product._id;
        await product.save();
    });

    after(async function () {
        await User.deleteOne({ email: 'vouchertest@gmail.com' });
        await Product.deleteOne({_id: productId});
    });

    describe('Get all voucher', ()=> {
        it('Get all voucher', async()=> {
            await chai
                .request(server)
                .get(`/voucher/get-all-voucher`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                })
        })
    });

    describe('Create new voucher', ()=> {
        it('Create new voucher', async ()=> {
            await chai.request(server)
                .post(`/voucher/add-new-voucher`)
                .set('Cookie', `utoken=${authToken}`)
                .set('Content-Type', 'multipart/form-data')
                .field('name', newVoucher.name)
                .field('desc', newVoucher.desc)
                .field('percent', newVoucher.percent)
                .field('startDate', newVoucher.startDate)
                .field('endDate', newVoucher.endDate)
                .attach('file', './public/images/testimage.jpg', 'testimage.jpg')
                .then(async (res)=> {
                    res.should.have.status(200)
                    res.should.be.an('object')
                    res.body.should.have.property('msg').equal("Đã thêm thành công.");
                });

            const createdVoucher= await Voucher.findOne({name: newVoucher.name});
            createdVoucher.should.exist;
            createdVoucher.name.should.equal(newVoucher.name);
            createdVoucher.desc.should.equal(newVoucher.desc);
            createdVoucher.percent.should.equal(newVoucher.percent);
            createdVoucher.start.toISOString().should.equal(newVoucher.startDate);
            createdVoucher.end.toISOString().should.equal(newVoucher.endDate);

            voucherId= createdVoucher._id;
        })
    });

    describe('Get voucher by ID', ()=> {
        it('Get voucher by ID', async()=> {
            await chai
                .request(server)
                .get(`/voucher/get-voucher/${voucherId}`)
                .then(res => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('name').equal(newVoucher.name);
                    res.body.should.have.property('desc').equal(newVoucher.desc);
                    res.body.should.have.property('percent').equal(newVoucher.percent);
                    res.body.should.have.property('start').equal(newVoucher.startDate);
                    res.body.should.have.property('end').equal(newVoucher.endDate);
                })
        })
    });

    describe('Get voucher by name', ()=> {
        it('Get voucher by name', async()=> {
            await chai
                .request(server)
                .get(`/voucher/get-voucher-by-name/${newVoucher.name}`)
                .then(res => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                })
        })
    });

    describe('Get product for voucher', ()=> {
        it('Get product for voucher', async()=> {
            await chai
                .request(server)
                .get(`/voucher/get-product-for-voucher`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                })
        })
    });

    describe('Get product of voucher', ()=> {
        it('Get voucher of voucher', async()=> {
            await chai
                .request(server)
                .get(`/voucher/get-product-of-voucher/${voucherId}`)
                .then(res => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                })
        })
    });

    describe('Add product to voucher', async()=> {
        it('Add product to voucher', async()=> {
            await chai
                .request(server)
                .put(`/voucher/add-product-to-voucher/${voucherId}`)
                .set('Cookie', `utoken=${authToken}`)
                .send({products: [productId]})
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đã thêm");
                });

            const updatedProduct= await Product.findById(productId);
            updatedProduct.voucher.should.equal(newVoucher.name);
        })
    });

    describe('Remove product from voucher', async()=> {
        it('Remove product form voucher', async()=> {
            await chai.request(server)
                .put(`/voucher/remove-product-from-voucher/${productId}`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đã xóa thành công");
                });
        })
    });

    describe('Reset all discount', async()=> {
        it('Reset all discount', async()=> {
            await chai.request(server)
                .put(`/voucher/reset-all-discount`)
                .set('Cookie', `utoken=${authToken}`)
                .send({vouchers: [voucherId]})
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đã reset");
                });
        })
    });

    describe('Remove all product from voucher', async()=>{
        it('Remove all product from voucher', async()=> {
            await chai.request(server)
                .delete(`/voucher/remove-all-product-from-voucher/${voucherId}`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đã xóa")
                })
        })
    });

    describe('Update voucher', async()=> {
        const currentDate= new Date();
        const updateVoucher= {
            name: "Updated",
            desc: "Updated desc",
            percent: 5,
            startDate: currentDate,
            endDate: new Date(currentDate.getTime() + 172800000)
        }
        it('Update voucher', async()=> {
            await chai.request(server)
                .put(`/voucher/update-voucher/${voucherId}`)
                .set('Cookie', `utoken=${authToken}`)
                .send({
                    name: updateVoucher.name,
                    desc: updateVoucher.desc,
                    percent: updateVoucher.percent,
                    startDate: updateVoucher.startDate,
                    endDate: updateVoucher.endDate
                })
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Cập nhật thành công.");
                });
        })
    });

    describe('Delete voucher', async()=>{
        it('Delete voucher', async()=> {
            await chai.request(server)
                .delete(`/voucher/delete-voucher/${voucherId}`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đã xóa.")
                })
        })
    });

})