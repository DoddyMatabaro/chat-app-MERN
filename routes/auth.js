const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const router = express.Router();
const crypto = require('crypto');
const trDb = require('../config/db.config');

passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, row);
      });
    });
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
  
// passport.use(new LocalStrategy((usename, password, cb)=>{
//     db.get
// }))
router.get('/login', (req, res, next)=>{
    res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

  router.get('/signup', function(req, res, next) {
    res.render('signup');
  })

  router.post('/signup', function(req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }

      trDb.set((err, db)=>{
            db.query('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
                req.body.username,
                hashedPassword,
                salt
            ], (err, result)=> {
                if (err) { return next(err); }
                const user = {
                id: result.insertId,
                username: req.body.username
                };
                req.login(user, function(err) {
                if (err) { return next(err); }
                res.redirect('/');
                });
            });
    });//trDB fin
    });
  });
  
module.exports = router;