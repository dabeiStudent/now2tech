const moment = require('moment');

const Order = require('../models/ordersModel');
const User = require('../models/usersModel');
const Product = require('../models/productsModel');

//create new order
const createOrder = async (req, res) => {

    if (!req.body.items) {
        return res.status(404).json({ err: "Không có sản phẩm" });
    } else {
        const newOrder = new Order({
            items: req.body.items.map((i) => ({
                ...i,
                productId: i._id
            })),
            user: req.data.uid,
            address: req.body.address,
            paymentMethod: req.body.paymentMethod,
            price: req.body.price,
            shippingFee: req.body.shippingFee,
            totalPrice: req.body.totalPrice
        });
        const addNewOrder = await newOrder.save();
        return res.status(200).json(addNewOrder);
    }
}
//get order by id
const getOrderById = async (req, res) => {
    const orderId = req.params.oid;
    const userId = req.data.uid;
    let order;
    try {
        order = await Order.findById(orderId).populate('user', '_id firstName lastName email phoneNumber');
        userFound = await User.findById(userId);
    } catch (err) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra." })
    }

    if (!order) {
        return res.status(404).json({ err: "Không tìm thấy đơn hàng" });
    }
    if (order.user.email === userFound.email || userFound.email === "tranlan0310@gmail.com") {
        return res.status(200).json(order);
    }
    else {
        return res.status(404).json({ err: "Không tìm thấy đơn hàng" });
    }
}
//get all order
const getAllOrder = (req, res) => {
    Order.find()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(404).json({ err: "Không thấy" });
        })
}
//get order by user
const getMyOrder = async (req, res) => {
    Order.find({ user: req.data.uid })
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(404).json({ err: "Không thấy" });
        })
}
//update order to paid
const updateToPaid = async (req, res) => {
    const orderId = req.params.oid;
    let order;
    try {
        order = await Order.findById(orderId).populate('user', 'firstName lastName email phoneNumber');
    } catch (err) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra." })
    }
    //Sau khi build xong FE sẽ tiến hành import chuẩn 1 order và xử lí Array items
    //để cập nhật quantity của product trong kho sau khi khách thanh toán
    if (order) {
        // order.paymentStatus = req.body.pstatus;
        order.paymentStatus.isPaid = true;
        order.paymentStatus.paidAt = new Date();
        const update = await order.save();
        return res.status(200).json(order);
    } else {
        return res.status(404).json({ err: "Không thấy đơn hàng" });
    }
}
//update order to delivered
const updateToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.oid);
    if (order) {
        order.status = req.body.status;
        const update = await order.save();
        return res.status(200).json({ msg: update });
    } else {
        return res.status(404).json({ err: "Không thấy đơn hàng" });
    }
}
const updateStatusOrderAdmin = async (req, res) => {
    const { oid, ostatus } = req.params;
    Order.findByIdAndUpdate(oid, { status: ostatus })
        .then(result => {
            return res.status(200).json({ msg: "Success" })
        })
        .catch(err => {
            return res.status(400).json({ err: err })
        })
}
const updateInstockAfterSent = async (req, res) => {
    const { oid, ostatus } = req.params;
    const orderFound = await Order.findById(oid);
    if (orderFound) {
        await Order.updateOne({ _id: orderFound._id }, { status: ostatus });
        orderFound.items.map(async (item) => {
            const productFound = await Product.findOne({ name: item.name })
            productFound.inStock = productFound.inStock - item.qty;
            productFound.sold = productFound.sold + item.qty;
            productFound.save();
            return res.status(200).json({ msg: "Success" });
        })
    }
}
const getPaypalClientId = async (req, res) => {
    res.status(200).json({ clientId: process.env.PAYPAL_CLIENT_ID });
}

const sortObject = (obj) => {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const createVNPayUrl = async (req, res) => {
    const oId = req.params.oid;
    let order;
    try {
        order = await Order.findById(oId);
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra khi tìm kiếm đơn hàng." });
    }

    if (!order) {
        return res.status(404).json({ err: "Không tìm thấy đơn hàng." })
    }

    if (order.paymentStatus.isPaid === true) {
        return res.status(404).json({ msg: "Đơn hàng đã được thanh toán." })
    }

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = process.env.vnp_TmnCode;
    let secretKey = process.env.vnp_HashSecret;
    let vnpUrl = process.env.vnp_Url;
    let returnUrl = process.env.vnp_ReturnUrl;
    let orderId = moment(date).format('DDHHmmss');
    let amount = order.totalPrice;
    let bankCode = '';

    let locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl + '/' + order._id;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    try {
        order.paymentStatus.payId = orderId;
        await order.save();
    } catch (error) {
        return res.status(404).json({ error })
    }

    res.status(200).json(vnpUrl)
}

const vnpayIPN = async (req, res) => {
    const oid = req.params.oid;

    let order;
    try {
        order = await Order.findById(oid);
    } catch (error) {
        return res.status(404).json({ err: "Đã có lỗi xảy ra khi tìm kiếm đơn hàng." });
    }

    if (!order) {
        return res.status(404).json({ err: "Không tìm thấy đơn hàng." })
    }

    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    let orderId = vnp_Params['vnp_TxnRef'];
    let rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = process.env.vnp_HashSecret;
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");

    let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    if (orderId !== order.paymentStatus.payId) {
        checkOrderId = false;
    }

    let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (vnp_Params['vnp_Amount'] / 100 !== order.totalPrice) {
        checkAmount = false;
    }

    if (secureHash === signed) { //kiểm tra checksum
        if (checkOrderId) {
            if (checkAmount) {
                // if (order.paymentStatus.isPaid === false) { //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                if (rspCode == "00") {
                    order.paymentStatus.isPaid = true;
                    order.paymentStatus.paidAt = new Date();
                    await order.save();
                    res.status(200).json({ RspCode: rspCode, Message: 'Success' })
                }
                else {
                    res.status(200).json({ RspCode: rspCode, Message: 'Failed' })
                }
                // }
                // else {
                //     res.status(200).json({ RspCode: '02', Message: 'This order has been updated to the payment status' })
                // }
            }
            else {
                res.status(200).json({ RspCode: '04', Message: 'Amount invalid' })
            }
        }
        else {
            res.status(200).json({ RspCode: '01', Message: 'Order not found' })
        }
    }
    else {
        res.status(200).json({ RspCode: '97', Message: 'Checksum failed' })
    }
}

module.exports = {
    createOrder,
    getAllOrder,
    getOrderById,
    getMyOrder,
    updateToPaid,
    updateToDelivered,
    updateStatusOrderAdmin,
    updateInstockAfterSent,
    getPaypalClientId,
    createVNPayUrl,
    vnpayIPN
};