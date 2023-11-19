const mongoose= require('mongoose');

const UserStatsSchem= new mongoose.Schema({
    year: {
        type: Number
    },
    monthlyStats: [
        {
            month: { type: Number },
            userNum: { type: Number, default: 0 }
        }
    ]
})

const UserStats= mongoose.model('user_stats', UserStatsSchem);
module.exports= UserStats;