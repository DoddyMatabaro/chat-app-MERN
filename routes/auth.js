const express = require('express')
const router = express.Router();
const {signOut, signUp, signIn, allUsers, user} = require("../controllers/auth");

  router.get('/signout', signOut);
  router.post('/signup', signUp);
  router.post("/signin",  signIn);

  router.get("/users/:id",  allUsers);
  router.get("/user/:id",  user);
  
module.exports = router;