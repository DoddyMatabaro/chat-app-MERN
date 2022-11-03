const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const router = express.Router();
const crypto = require('crypto');
// const db  = require('../db');

passport.use(new LocalStrategy((usename, password, cb)=>{
    db.get
}))
router.get('/login', (req, res, next)=>{
    res.render('login');
});

module.exports = router;