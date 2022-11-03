const mongodb=require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config()

const password = process.env.PASS_DB;
const user = process.env.USER_DB;
const urlDB = `mongodb+srv://${user}:${password}@atlascluster.zeaqo3p.mongodb.net/?retryWrites=true&w=majority`;

const mongoConnect = callback=>{
    MongoClient.connect(urlDB)
    .then(client=>{
        console.log("Connected to Mongo");
        callback(client);
    })
    .catch((error)=>{
        console.log(error)
    });
};

module.exports = mongoConnect;

