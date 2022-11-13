const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/login', (req, res, next)=>{
    res.render('login');
});

// router.post('/login/password', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

  router.get('/signup', function(req, res, next) {
    res.render('signup');
  })

  router.post('/signup', (req, res) =>{
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
            // db.query('INSERT INTO users(username, hashed_password, salt) VALUES (?, ?, ?)', [
            //     req.body.username,
            //     hashedPassword,
            //     salt
            // ], (err, result)=> {
            //     if (err) { 
            //         console.log(err)
            //         return next(err); 
            //     }
            //     const user = {
            //     id: result.insertId,
            //     username: req.body.username
            //     };
            //     req.login(user, function(err) {
            //     if (err) { return next(err); }
            //     res.redirect('/');
            //     });
            // });
  });

  router.post("/login/password",  (req, res)=> {
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
                    // const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" });
                    res.json({ success: true, message: "Authentication successful"});
                }
            }
        })(req, res);
    }
});
  
module.exports = router;