require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);


const connect2DB = require('./config/connect2DB');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const voucherRoutes = require('./routes/voucherRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const salesRoutes = require('./routes/salesRoutes');
const brandRoutes = require('./routes/brandRoutes');

const creatSocketIo = require('./utils/chatSocket');

//init server & connect 2 db
const PORT = process.env.PORT || 8000;
server.listen(PORT, async (req, res) => {
    console.log(`Server is running on PORT: ${PORT}`);
});
connect2DB();

//setup cors
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})

//setup socket cho realtime chat 
creatSocketIo(server);

//setup reqbody
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setup static file
app.use(express.static('backend/public'));
//init web routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/voucher', voucherRoutes);
app.use('/category', categoryRoutes);
app.use('/comment', commentRoutes);
app.use('/statistic', statisticRoute);
app.use('/brand', brandRoutes);

//test private repository
//Chỉnh lại cơ chế lấy username sau khi đăng nhập ở navlink
//Thêm ảnh sản phẩm
//Tiếp tục làm set trạng thái order admin
//Làm tiếp chat
//Làm trang sản phẩm theodanh mục.... tìm kiếm sản phẩm
//=> Tạm thời xong