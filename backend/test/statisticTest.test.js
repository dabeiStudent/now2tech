const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const jwt= require('jsonwebtoken');
const User= require('../models/usersModel');

chai.use(chaiHttp);

describe('Statistic Controller', async()=> {
    let authToken;
    before(async function () {
        const user = new User({
            email: "statistictest@gmail.com",
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
        await User.deleteOne({ email: 'statistictest@gmail.com' });
    });

    describe('Get statistic', async()=> {
        it('Get statistic', async()=> {
            await chai.request(server)
                .get(`/statistic/get-statistic`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('orderTotal');
                    res.body.should.have.property('userTotal');
                    res.body.should.have.property('productTotal');
                    res.body.should.have.property('orderStats');
                })
        })
    });

    describe('Get user statistic', async()=> {
        it('Get user statistic', async()=> {
            await chai.request(server)
                .get(`/statistic/user-statistic`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                });
        })
    });

    describe('Get sales statistic', async()=> {
        it('Get sales statistic', async()=> {
            await chai.request(server)
                .get(`/statistic/sales-statistic`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                });
        })
    })
})