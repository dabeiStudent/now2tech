const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const argon2 = require('argon2');

const jwt= require('jsonwebtoken');
const User= require('../models/usersModel');

chai.use(chaiHttp);

describe('User Controller', async()=> {
    let authToken;
    let userToken;
    let userId;
    
    before(async function () {
        const hashedPassword = await argon2.hash("123");
        const admin = new User({
            email: "admintest@gmail.com",
            passWord: "123",
            firstName: "Duong",
            lastName: "Le",
            phoneNumber: '0931272713',
            userName: 'dabeihihalatui'
        })
        await admin.save();
        authToken = jwt.sign({
            uid: admin._id,
            userName: admin.userName,
            email: admin.email,
            role: 'admin',
            image: admin.image
        }, process.env.JWT_KEY, { expiresIn: 604800 });

        
        const user = new User({
            email: "usertest@gmail.com",
            passWord: hashedPassword,
            firstName: "Duong",
            lastName: "Le",
            phoneNumber: '0931272713',
            userName: 'dabeihihalatui'
        });
        userId= user._id;
        await user.save();
        userToken = jwt.sign({
            uid: user._id,
            userName: user.userName,
            email: user.email,
            role: 'user',
            image: user.image
        }, process.env.JWT_KEY, { expiresIn: 604800 });
    });

    after(async function () {
        await User.deleteMany();
    });

    describe('Get user', async()=> {
        it('Get user', async()=> {
            await chai.request(server)
                .get(`/user/get-user`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                })
        })
    });

    describe('Get one user', async()=> {
        it('Get one user', async()=> {
            await chai.request(server)
                .get(`/user/get-user/${userId}`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                })
        })
    });

    describe('Get user profile', async()=> {
        it('Get user profile', async()=> {
            await chai.request(server)
                .get(`/user/profile/my-profile`)
                .set('Cookie', `utoken=${userToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                })
        })
    });

    describe('User login', async()=> {
        it('User login', async()=> {
            await chai.request(server)
                .post(`/user/user-login`)
                .send({
                    email: "usertest@gmail.com",
                    passWord: "123"
                })
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đăng nhập thành công");
                })
        })
    });

    describe('Authorize user', async()=> {
        it('Authorize user', async()=> {
            await chai.request(server)
                .get(`/user/authorize-user`)
                .set('Cookie', `utoken=${userToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                })
        })
    });

    describe('Logout user', async()=> {
        it('Logout user', async()=> {
            await chai.request(server)
                .post(`/user/user-logout`)
                .set('Cookie', `utoken=${userToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal('Good bye!');
                })
        })
    });

    describe('Reset password (send request)', async()=> {
        it('Send request', async()=> {
            await chai.request(server)
                .post(`/user/reset-password/send-request`)
                .send({
                    email: 'usertest@gmail.com'
                })
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Hãy kiểm tra email");
                })
        })
    });

   //Check token
   describe('User register', async()=> {
        const newUser = {
            email: "vinhthien@gmail.com",
            passWord: "123",
            firstName: "Thien",
            lastName: "Nguyen",
            phoneNumber: '0931272713',
            userName: 'vinhthien'
        };
        it('User register', async()=> {
            await chai.request(server)
                .post(`/user/user-register`)
                .send(newUser)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal('Tạo tài khoản thành công');
                })
        })
    });

    describe('User update by admin', async()=> {
        it('User update by admin', async()=> {
            await chai.request(server)
                .put(`/user/user-update/${userId}`)
                .set('Cookie', `utoken=${authToken}`)
                .send({
                    userName: "updated name",
                    phoneNumber: "0931272834",
                    gender: 'male' 
                })
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Cập nhật thông tin thành công");
                })
        })
    });

    describe('Update user profile', async()=> {
        it('Update user profile', async()=> {
            await chai.request(server)
                .put(`/user/profile/update`)
                .set('Cookie', `utoken=${userToken}`)
                .send({
                    userName: "updated by user",
                    phoneNumber: "0931272834",
                    gender: 'female' 
                })
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Cập nhật thông tin thành công");
                })
        })
    });

    describe('Update user profile picture', async()=> {
        it('Update user profile picture', async()=> {
            await chai.request(server)
                .put(`/user/profile/update-image`)
                .set('Cookie', `utoken=${userToken}`)
                .set('Content-Type', 'multipart/form-data')
                .attach('file', './public/images/testimage.jpg', 'testimage.jpg')
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Upload thành công");
                })
        })
    });

    describe('User change password', async()=> {
        it('User change password', async()=> {
            await chai.request(server)
                .put(`/user/user-changepassword`)
                .set('Cookie', `utoken=${userToken}`)
                .send({
                   oldPassword: '123',
                   newPassword: '12345' 
                })
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đã cập nhật mật khẩu");
                })
        })
    });

    describe('Update user status by admin', async()=> {
        it('Block', async()=> {
            await chai.request(server)
                .put(`/user/user-status/${userId}/1`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đã khóa");
                })
        });
        it('Unblock', async()=> {
            await chai.request(server)
                .put(`/user/user-status/${userId}/0`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đã mở khóa");
                })
        })
    });

    describe('Delete user', async()=> {
        it('Delete user', async()=> {
            await chai.request(server)
                .delete(`/user/user-remove/${userId}`)
                .set('Cookie', `utoken=${authToken}`)
                .then(res=> {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').equal("Đã xóa tài khoản");
                })
        })
    });

})