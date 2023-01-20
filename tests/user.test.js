const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config() //to load env variable
 
//connection to the database
beforeEach(async ()=>{
    await mongoose.connect(process.env.MONGODB_URI);
});



// close database after each test

afterEach(async ()=>{
    await mongoose.connection.close();
});