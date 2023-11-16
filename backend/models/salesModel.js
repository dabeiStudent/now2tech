const mongoose= require('mongoose');

const SalesSchema= new mongoose.Schema({
    month: {
        type: Number
    },
    year: {
        type: Number
    },
    sold: [
        { 
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'},
            qty: { type: Number, default: 0 }
        }
    ]
})

const Sales= mongoose.model('sale', SalesSchema);
module.exports= Sales;