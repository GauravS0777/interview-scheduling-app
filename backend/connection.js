const { MongoClient } = require('mongodb');

const mongodb_url = "mongodb://localhost:27017/";
const client = new MongoClient(mongodb_url);
let major1DB;

const connectDB = async () => {
    try{
        await client.connect();
        major1DB = client.db("major1");
        console.log('Connected successfully to MongoDB database');
    }catch(error) {
        throw error;
    }
}

module.exports = {
    connectDB: connectDB,
    getClient: () => client,
    getDB: () => major1DB
};
