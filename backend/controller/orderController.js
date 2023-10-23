const Order = require('../models/ordersModel');

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
            // status: req.body.status,
            paymentMethod: req.body.paymentMethod,
            // paymentStatus: req.body.paymentStatus,
            price: req.body.price,
            shippingFee: req.body.shippingFee,
            totalPrice: req.body.totalPrice
        });
        const addNewOrder = await newOrder.save();
        return res.status(200).json(addNewOrder);
    }
}
//get order by id
const getOrderById= async (req, res)=> {
    const orderId= req.params.oid;
    
    let order;
    try{
        order= await Order.findById(orderId).populate('user', 'firstName lastName email phoneNumber');
    } catch (err){
        return res.status(404).json({err: "Đã có lỗi xảy ra." })
    }
    
    if(!order){
        return res.status(404).json({err: "Không tìm thấy đơn hàng"});
    }

    res.status(200).json(order);
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
const getMyOrder = (req, res) => {
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
    const orderId= req.params.oid;
    let order;
    try{
        order= await Order.findById(orderId).populate('user', 'firstName lastName email phoneNumber');
    }catch(err){
        return res.status(404).json({err: "Đã có lỗi xảy ra."})
    }
    //Sau khi build xong FE sẽ tiến hành import chuẩn 1 order và xử lí Array items
    //để cập nhật quantity của product trong kho sau khi khách thanh toán
    if (order) {
        // order.paymentStatus = req.body.pstatus;
        order.paymentStatus.isPaid= true;
        order.paymentStatus.paidAt= new Date();
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

const getPaypalClientId= async(req, res)=> {
    res.status(200).json({clientId: process.env.PAYPAL_CLIENT_ID});
}

module.exports = { createOrder, getAllOrder, getOrderById, getMyOrder, updateToPaid, updateToDelivered, getPaypalClientId };