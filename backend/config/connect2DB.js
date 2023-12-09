const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const uri = process.env.mongodb;

let mongoServer;


async function connect2DB(env) {
    if (env === 'test') {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        try {
            await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Virtual Database is connected");
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            mongoose.set('strictQuery', true);
            await mongoose.connect(uri, {
                useNewUrlParser: true
            });
            console.log("MongoDB is connected");
        } catch (err) {
            console.log(err.message);
            process.exit(1);
        }
    }
}
async function stopDatabase() {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
}

module.exports = { connect2DB, stopDatabase };
