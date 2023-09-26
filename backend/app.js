require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);


const connect2DB = require('./config/connect2DB');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

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
//init web routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRoutes);
app.use('/product', productRoutes);


//hihi