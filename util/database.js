const mongodb=require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config()

let _db;

const password = process.env.PASS_DB;
const user = process.env.USER_DB;
const urlDB = `mongodb+srv://${user}:${password}@atlascluster.zeaqo3p.mongodb.net/?retryWrites=true&w=majority`;

exports.mongoConnect = (callback)=>{
    MongoClient.connect(urlDB)
    .then(client=>{
        console.log("Connected to Mongo");
        _db = client.db();
        callback();
    })
    .catch((error)=>{
        console.log(error);
    });
};

exports.getDB = () =>{
    if(_db){
        return _db;
    }
    throw "no database found";
}



