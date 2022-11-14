const express = require('express')
const router = express.Router();
const {signOut, signUp, signIn, allUsers} = require("../controllers/auth");

  router.post('/signout', signOut);

  router.post('/signup', signUp);

  router.post("/signin",  signIn);

  router.post("/users/:id",  allUsers);
  
module.exports = router;