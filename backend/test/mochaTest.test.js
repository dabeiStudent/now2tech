const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const sinon = require('sinon');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');

const Voucher = require('../models/vouchersModel');

chai.use(chaiHttp);


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
        const res = await chai
            .request(server)
            .post('/user/user-register')
            .send(user)
        res.should.have.status(200);
        res.body.should.have.property('msg').eql("Tạo tài khoản thành công");
    });
    it('user-dang-nhap', async () => {
        let user = {
            email: "Quangduonggay@gmail.com",
            passWord: "123"
        }
        const res = await chai
            .request(server)
            .post('/user/user-login')
            .send(user)
        res.should.have.status(200);
        res.body.should.have.property('msg').eql("Đăng nhập thành công");
    });
});

describe('Quan ly khuyen mai', () => {
    describe('Get all voucher', () => {
        it('Get all voucher', async () => {
            const res = await chai
                .request(server)
                .get(`/voucher/get-all-voucher`)
            res.should.have.status(200);
            res.body.should.be.an('array');
        })
    });

})