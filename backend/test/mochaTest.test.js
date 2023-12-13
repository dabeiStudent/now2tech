const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const moment= require('moment');
const jwt= require('jsonwebtoken');
const Voucher= require('../models/vouchersModel');
const { createVoucher } = require('../controller/voucherController');

chai.use(chaiHttp);

const adminToken = jwt.sign({ role: 'admin' }, process.env.JWT_KEY);

before(() => {
    console.log("Bắt đầu kiểm thử")
})
after(() => {
    console.log('Đã kiểm xong');
})

describe('quan-ly-user', () => {
    it('user-dang-ki', async () => {
        let user = {
            email: "Quangduonggay@gmail.com",
            passWord: "123",
            firstName: "Duong",
            lastName: "Le",
            phoneNumber: '0931272713',
            userName: 'dabeihihalatui'
        }
        await chai
            .request(server)
            .post('/user/user-register')
            .send(user)
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql("Tạo tài khoản thành công");
            })
    });
    it('user-dang-nhap', async () => {
        let user = {
            email: "Quangduonggay@gmail.com",
            passWord: "123"
        }
        let response;
        await chai
            .request(server)
            .post('/user/user-login')
            .send(user)
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql("Đăng nhập thành công");
            })
    });
});

describe('Quan ly khuyen mai', ()=> {
    let voucherId;
    const currentDate= moment();
    const newVoucher= {
            name: 'Test voucher',
            desc: 'Test Description',
            percent: 10,
            startDate: currentDate.toISOString(),
            endDate: currentDate.toISOString()
    }
    describe('Get all voucher', ()=> {
        it('Get all voucher', async()=> {
            await chai
                .request(server)
                .get(`/voucher/get-all-voucher`)
                .then(res => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                })
        })
    });
    describe('Create new voucher', ()=> {
        it('Create new voucher', async ()=> {
            await chai.request(server)
                .post(`/voucher/add-new-voucher`)
                .set('Cookie', `utoken=${adminToken}`)
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
    })
})