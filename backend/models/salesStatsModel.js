const mongoose= require('mongoose');

const SalesSchema= new mongoose.Schema({
    year: {
        type: Number
    },
    totalSales: {
        type: Number,
        default: 0
    },
    monthlyStats: [
        {
            month: { type: Number },
            sales: { type: Number, default: 0 }
        }
    ]
})

const SalesStats= mongoose.model('sales_stats', SalesSchema);
module.exports= SalesStats;