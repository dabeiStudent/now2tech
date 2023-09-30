require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);


const connect2DB = require('./config/connect2DB');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoues');
const voucherRoutes = require('./routes/voucherRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

//init server & connect 2 db
const PORT = process.env.PORT || 8000;
server.listen(PORT, async (req, res) => {
    console.log(`Server is running on PORT: ${PORT}`);
});
connect2DB();
//setup cors
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
//setup reqbody
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//init web routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/voucher', voucherRoutes);
app.use('/category', categoryRoutes);


//test private repository
