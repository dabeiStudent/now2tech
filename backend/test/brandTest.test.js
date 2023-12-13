const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const jwt = require('jsonwebtoken');

const Brand = require('../models/brandModel');
const User = require('../models/usersModel');

chai.use(chaiHttp);

describe('Brand Controller', () => {
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
        await Brand.deleteMany({});
    })

    it('Trả về tất cả những brand đang có', () => {
        chai.request(server)
            .get('/brand/get-brand')
            .then(res => {
                res.should.have.status(200);
            })
    });
    it('Trả về brand dựa trên danh mục được truyền vào params', () => {
        chai.request(server)
            .get('/brand/get-brand-cate/Laptop')
            .then(res => {
                res.should.have.status(200);
            })
    });
    it('Thêm 1 brand vào danh mục', async () => {
        let brand = {
            name: 'Sony',
            category: 'Máy ảnh'
        };
        await chai.request(server)
            .post('/brand/add-brand')
            .set('Cookie', `utoken=${authToken}`)
            .send(brand)
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Success');
            })
    });
    it('Xóa 1 brand', async () => {
        let brand = new Brand({
            name: 'Test',
            category: 'TestCate'
        });
        await brand.save();
        const findBrand = await Brand.findOne({ name: brand.name, category: brand.category });

        await chai.request(server)
            .delete(`/brand/remove-brand/${findBrand._id}`)
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Success');
            })
    })
})