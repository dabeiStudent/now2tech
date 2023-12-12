const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const sinon= require('sinon');
const cloudinary = require('cloudinary').v2;
const jwt= require('jsonwebtoken');

const Voucher= require('../models/vouchersModel');

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
    
})