const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const jwt = require('jsonwebtoken');

const User = require('../models/usersModel');
const Product = require('../models/productsModel');
const Comment = require('../models/commentsModel');
chai.use(chaiHttp);

describe('Comment Controller', () => {
    let authToken;

    before(async function () {
        const user = new User({
            email: "Quangduonggay@gmail.com",
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
    });
    after(async function () {
        await User.deleteOne({ email: 'Quangduonggay@gmail.com' });
        await Product.deleteMany({});
        await Comment.deleteMany({});
    })

    it('Thêm comment vào 1 sản phẩm', async () => {
        const product = new Product({
            sku: "TESTSKU",
            name: "Test san pham",
            importPrice: 1400000,
            sellPrice: 1900000,
            desc: 'Rất bền',
            comment: ''
        });
        await product.save();
        const findProduct = await Product.findOne({ sku: 'TESTSKU' });

        const comment = new Comment({
            content: 'Tôi test comment',
            product: findProduct._id,
            user: {
                name: 'Duy Lân',
                phoneNumber: 9931272713,
                email: 'tranlan0310@gmail.com'
            }
        })

        await chai.request(server)
            .post(`/comment/create-comment/${findProduct._id}`)
            .set('Cookie', `utoken=${authToken}`)
            .send(comment)
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Comment thành công.');
            })
    });
    it('Thêm 1 comment (Đã log in)', async () => {
        const findProduct = await Product.findOne({ sku: 'TESTSKU' });
        const comment = new Comment({
            content: 'Tôi test comment',
            product: findProduct._id
        })

        await chai.request(server)
            .post(`/comment/logged-create-comment/${findProduct._id}`)
            .set('Cookie', `utoken=${authToken}`)
            .send(comment)
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Comment thành công.');
            })
    })
    it('Xóa comment', async () => {
        const comment = new Comment({
            content: 'Tôi test comment',
            user: {
                name: 'Duy Lân',
                phoneNumber: 9931272713,
                email: 'tranlan0310@gmail.com'
            }
        })
        await comment.save();
        const findComment = await Comment.findOne({
            content: 'Tôi test comment'
        })
        await chai.request(server)
            .delete(`/comment/remove-comment/${findComment._id}`)
            .set('Cookie', `utoken=${authToken}`)
            .send(comment)
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Đã xóa');
            })
    })
    it('Xem comment của 1 sản phẩm', async () => {
        const product = new Product({
            sku: "TESTSKU2",
            name: "Test san pham2",
            importPrice: 1400000,
            sellPrice: 1900000,
            desc: 'Rất bền',
            comment: ''
        });
        await product.save();
        const findProduct = await Product.findOne({ sku: 'TESTSKU' });

        const comment = new Comment({
            content: 'Tôi test comment',
            product: findProduct._id,
            user: {
                name: 'Duy Lân',
                phoneNumber: 9931272713,
                email: 'tranlan0310@gmail.com'
            }
        })
        comment.save();
        await chai.request(server)
            .get(`/comment/get-comments/${findProduct._id}`)
            .then(res => {
                res.should.have.status(200);
            })
    });
    it('Trả lời 1 bình luận (chưa đăng nhập)', async () => {
        const productFind = await Product.findOne({ sku: 'TESTSKU2' });
        const commentMain = new Comment({
            content: 'Tôi test comment',
            product: productFind._id,
            user: {
                name: 'Duy Lân',
                phoneNumber: 9931272713,
                email: 'tranlan0310@gmail.com'
            }
        })
        await commentMain.save();
        const commentSub = new Comment({
            content: 'Tôi là sub comment',
            product: productFind._id,
            user: {
                name: 'Vĩnh Thiện',
                phoneNumber: 9931272713,
                email: 'tranlan0310@gmail.com'
            }
        })
        await chai.request(server)
            .post(`/comment/reply-comment/${commentMain._id}`)
            .send(commentSub)
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Phản hồi thành công.');
            })
    });
    it('Phản hồi 1 mình luận (Đã log in)', async () => {
        const productFind = await Product.findOne({ sku: 'TESTSKU2' });
        const commentMain = new Comment({
            content: 'Tôi test comment MAIN lần 2',
            product: productFind._id,
            user: {
                name: 'Duy Lân',
                phoneNumber: 9931272713,
                email: 'tranlan0310@gmail.com'
            }
        })
        await commentMain.save();
        const commentSub = new Comment({
            content: 'Tôi là sub comment 2',
            product: productFind._id
        });
        await chai
            .request(server)
            .post(`/comment/logged-reply-comment/${commentMain._id}`)
            .set('Cookie', `utoken=${authToken}`)
            .send(commentSub)
            .then(res => {
                res.should.have.status(200);
            })
    })

});