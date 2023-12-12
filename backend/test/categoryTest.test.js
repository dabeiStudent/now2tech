const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

const Category = require('../models/categoryModel');
const User = require('../models/usersModel');

describe('Category Controller', () => {
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
        await Category.deleteMany({});
    })
    it('Lấy ra danh sách danh mục hiện tại', async () => {
        await chai.request(server)
            .get('/category/get-category')
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
            })
    })
    it('Thêm 1 danh mục', async () => {
        let category = {
            name: 'Máy ảnh',
            keyword: 'Máy ảnh'
        };
        await chai.request(server)
            .post('/category/add-category')
            .set('Cookie', `utoken=${authToken}`)
            .send(category)
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Thành công');
            })
    });
    it('Xóa 1 danh mục', async () => {
        let category = new Category({
            name: 'Test danh muc',
            keyword: 'Test'
        });
        await category.save();
        const findCate = await Category.findOne({ name: category.name, keyword: category.keyword });

        await chai.request(server)
            .delete(`/category/delete-category/${findCate._id}`)
            .set('Cookie', `utoken=${authToken}`)
            .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Đã xóa');
            })
    })
})