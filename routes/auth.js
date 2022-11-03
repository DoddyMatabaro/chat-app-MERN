const express = require('express');

const router = express.router();

router.ge('/login', function(req, res, next)=>{
    res.render('login');
});

module.exports = router;