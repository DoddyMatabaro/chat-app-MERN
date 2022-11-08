const express = require('express');
const db = require('../config/db.config');

const router = express.Router();

// home page
router.get('/', (req, res, next)=>{
    if (!req.user) { return res.render('home'); }
    next();
  },(req, res, next) =>{
    res.locals.filter = null;
    res.render('index', { user: req.user });
  });

  module.exports = router;