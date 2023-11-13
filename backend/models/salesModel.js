const mongoose= require('mongoose');

const SalesSchema= new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId
    },
    sales: [
        {
            month: {
                type: Number
            },
            year: {
                type: Number
            },
            value: {
                type: Number,
                default: 0
            }
        }]
})

const Sales= mongoose.model('sale', SalesSchema);
module.exports= Sales;