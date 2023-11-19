const Stats= require('../models/userStatsModel');
const Order= require('../models/ordersModel');
const User= require('../models/usersModel');
const Product= require('../models/productsModel');
const SalesStats= require('../models/salesStatsModel');

const getStatistic= async(req, res)=> {
    let orderTotal;
    let userTotal;
    let productTotal;
    let notProcessedOrder;
    let proccessingOrder;
    let shippedOrder;
    let deliveredOrder;
    let cancelledOrder;

    try {
        orderTotal= await Order.countDocuments();
        userTotal= await User.countDocuments({role: 'user'});
        productTotal= await Product.countDocuments();
        notProcessedOrder= await Order.countDocuments({status: 'Not_proccessed'});
        proccessingOrder= await Order.countDocuments({status: 'Processing'});
        shippedOrder= await Order.countDocuments({status: 'Shipped'});
        deliveredOrder= await Order.countDocuments({status: 'Delivered'});
        cancelledOrder= await Order.countDocuments({status: 'Cancelled'});
    } catch (error) {
        return res.status(404).json({err: 'Đã xảy ra lỗi.'});
    }

    const orderStats= {
        labels: ['Not_proccessed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        datasets: [
            notProcessedOrder/orderTotal*100, 
            proccessingOrder/orderTotal*100, 
            shippedOrder/orderTotal*100, 
            deliveredOrder/orderTotal*100, 
            cancelledOrder/orderTotal*100]
    };

    res.status(200).json({ orderTotal, userTotal, productTotal, orderStats });
}

const getUserStats= async(req, res)=> {
    const year= req.query.year;
    let userStats;
    try {
        userStats= await Stats.findOne({year: year});        
    } catch (error) {
        return res.status(404).json({err: 'Đã xảy ra lỗi.'});        
    }

    res.status(200).json(userStats);
}

const getSalesStats= async(req, res)=> {
    const year= req.query.year;
    let salesStats;
    try {
        salesStats= await SalesStats.findOne({year: year});        
    } catch (error) {
        return res.status(404).json({err: 'Đã xảy ra lỗi.'});        
    }

    res.status(200).json(salesStats);
}

module.exports= {
    getStatistic,
    getUserStats,
    getSalesStats
}