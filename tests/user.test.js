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

// test signup

describe("POST /api/auth/signup", ()=>{
    it("Vous devez avoir un compte", async ()=>{
        const res = await request(app).post("/api/auth/signup").send({
            username: "baba",
            password: "King2"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Your account has been saved");
    });
});