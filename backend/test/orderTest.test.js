const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const jwt = require('jsonwebtoken');

const User = require('../models/usersModel');
const Product = require('../models/productsModel');
const Comment = require('../models/commentsModel');
const Order = require('../models/ordersModel');
chai.use(chaiHttp);

describe('Order Controller', () => {
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
        await Order.deleteMany({});
    })
    it('Xem tất cả sản đơn hàng (admin)', async () => {
        await chai.request(server)
            .get('/order/all-order')
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
            })
    })
    it('Xem tất cả đơn hàng của bản thân', async () => {
        await chai.request(server)
            .get('/order/my-order')
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
            })
    })
    it('Xem chi tiết đơn hàng', async () => {
        const findUser = await User.findOne({ email: 'Quangduonggay@gmail.com' });
        const order = new Order({
            user: findUser._id
        });
        await order.save();
        await chai.request(server)
            .get(`/order/get-order/${order._id}`)
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
            })
    })
    it('Tạo 1 đơn hàng', async () => {
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
        await chai.request(server)
            .post('/order/create-order')
            .set('Cookie', `utoken=${authToken}`)
            .send({
                items: [findProduct],
                address: '3521, Phường 2, Phú Nhuận, TP.Hồ Chí Minh',
                paymentMethod: 'COD',
                price: 2000000,
                shippingFee: 12000,
                totalPrice: 2000000 + 12000
            })
            .then(res => {
                res.should.have.status(200);
            })
    })
    it('Tạo URL Vnpay', async () => {
        const findProduct = await Product.findOne({ sku: 'TESTSKU' });
        const userFound = await User.findOne({ email: 'Quangduonggay@gmail.com' });

        const orderFound = await Order.create({
            user: userFound._id,
            items: [findProduct],
            address: '3521, Phường 2, Phú Nhuận, TP.Hồ Chí Minh',
            paymentMethod: 'COD',
            price: 2000000,
            shippingFee: 12000,
            totalPrice: 2000000 + 12000
        });
        await orderFound.save();
        await chai.request(server)
            .post(`/order/create-vnpay-url/${orderFound._id}`)
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
            })
    });

    it('Cập nhật order đã thanh toán', async () => {
        const findProduct = await Product.findOne({ sku: 'TESTSKU' });
        const userFound = await User.findOne({ email: 'Quangduonggay@gmail.com' });

        const orderFound = await Order.create({
            user: userFound._id,
            items: [findProduct],
            address: '3521, Phường 2, Phú Nhuận, TP.Hồ Chí Minh',
            paymentMethod: 'COD',
            price: 2000000,
            shippingFee: 12000,
            totalPrice: 2000000 + 12000
        });
        await orderFound.save();
        await chai.request(server)
            .put(`/order/update-to-paid/${orderFound._id}`)
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
            })
    });
    it('Cập nhật hủy order', async () => {
        const findProduct = await Product.findOne({ sku: 'TESTSKU' });
        const userFound = await User.findOne({ email: 'Quangduonggay@gmail.com' });

        const orderFound = await Order.create({
            user: userFound._id,
            items: [findProduct],
            address: '3521, Phường 2, Phú Nhuận, TP.Hồ Chí Minh',
            paymentMethod: 'COD',
            price: 2000000,
            shippingFee: 12000,
            totalPrice: 2000000 + 12000
        });
        await orderFound.save();
        await chai.request(server)
            .put(`/order/cancel-order/${orderFound._id}`)
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
            })
    });
    it('Cập nhật trạng thái giao hàng', async () => {
        const findProduct = await Product.findOne({ sku: 'TESTSKU' });
        const userFound = await User.findOne({ email: 'Quangduonggay@gmail.com' });

        const orderFound = await Order.create({
            user: userFound._id,
            items: [findProduct],
            address: '3521, Phường 2, Phú Nhuận, TP.Hồ Chí Minh',
            paymentMethod: 'COD',
            price: 2000000,
            shippingFee: 12000,
            totalPrice: 2000000 + 12000
        });
        await orderFound.save();
        await chai.request(server)
            .put(`/order/update-status/${orderFound._id}/Processing`)
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
            })
    });
    it('Cập nhật trạng thái giao hàng (Đã gửi cho shipper)', async () => {
        const product = new Product({
            sku: "TESTSKU33",
            name: "Test san pham33",
            importPrice: 1400000,
            sellPrice: 1900000,
            desc: 'Rất bền',
            comment: '',
            inStock: 100,
            sold: 0
        });
        await product.save();
        const userFound = await User.findOne({ email: 'Quangduonggay@gmail.com' });

        const orderFound = await Order.create({
            user: userFound._id,
            items: [
                {
                    name: "Test san pham33",
                    qty: 1,
                    price: 1900000,
                    productId: product._id
                }],
            address: '3521, Phường 2, Phú Nhuận, TP.Hồ Chí Minh',
            paymentMethod: 'COD',
            price: 2000000,
            shippingFee: 12000,
            totalPrice: 2000000 + 12000
        });
        await chai.request(server)
            .put(`/order/update-status-shipped/${orderFound._id}/Shipped`)
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
            })
    })
});