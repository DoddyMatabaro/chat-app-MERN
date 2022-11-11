const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

class UserController{
    static async loginUser(req, res){
        if (!req.body.username) {
            res.json({ success: false, message: "Username was not given" })
        }
        else if (!req.body.password) {
            res.json({ success: false, message: "Password was not given" })
        }
        else {
            passport.authenticate("local", function (err, user, info) {
                if (err) {
                    res.json({ success: false, message: "err"+err });
                }
                else {
                    if (!user) {
                        res.json({ success: false, message: "username or password incorrect" });
                    }
                    else {
                        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.secretToken, { expiresIn: "24h" });
                        res.json({ success: true, message: "Authentication successful"});
                    }
                }
            });
        }
    };

    static async signupUser(req, res){
        User.register(new User({username: req.body.username}), req.body.password,(err, user)=>{
            if(err){
                res.json({success: false, message: "Your account could not be saved. Error: "+err})
            }else{
                req.login(user, (er)=> {
                    if (er) {
                        res.json({ success: false, message: er });
                    }
                    else {
                        res.json({ success: true, message: "Your account has been saved" });
                    }
                })
            }
        });
    };
}

module.exports = UserController;
