require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const cloudinary= require('cloudinary').v2;


const connect2DB = require('./config/connect2DB');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const voucherRoutes = require('./routes/voucherRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const statisticRoutes = require('./routes/statisticRoutes');
const brandRoutes = require('./routes/brandRoutes');

const creatSocketIo = require('./utils/chatSocket');
const path = require('path');

cloudinary.config({ 
    cloud_name: 'dkvtla079', 
    api_key: '978682155146359', 
    api_secret: 'SUm82lmW7Z45rCc1tPjid8WoVAc' 
});

//init server & connect 2 db
const PORT = process.env.PORT || 8000;
server.listen(PORT, async (req, res) => {
    console.log(`Server is running on PORT: ${PORT}`);
});
connect2DB();

//setup cors https://now2tech-f987dbd48ed8.herokuapp.com
app.use(cors({ origin: 'https://now2tech-f987dbd48ed8.herokuapp.com', credentials: true }));
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
app.use('/public/images', express.static(path.join('public', 'images')));
app.use(express.static(path.join('public')))
//init web routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/voucher', voucherRoutes);
app.use('/category', categoryRoutes);
app.use('/comment', commentRoutes);
app.use('/statistic', statisticRoutes);
app.use('/brand', brandRoutes);

app.use((req, res, next)=> {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})