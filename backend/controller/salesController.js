const Sales= require('../models/salesModel');

const getSaleByProductId= async(req, res)=> {
    // const productId= req.params
    // const productSales= await Sales.find({product: productId});

    res.status(200).json('Called sales');
}

module.exports= {
    getSaleByProductId
}