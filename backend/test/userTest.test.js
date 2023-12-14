const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const jwt= require('jsonwebtoken');
const User= require('../models/usersModel');

chai.use(chaiHttp);

describe('Product Controller', async()=> {
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
    });
})