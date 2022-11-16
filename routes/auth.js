const express = require('express')
const router = express.Router();
const {signOut, signUp, signIn, allUsers} = require("../controllers/auth");

  router.get('/signout', signOut);
  router.post('/signup', signUp);
  router.post("/signin",  signIn);

  router.get("/users/:id",  allUsers);
  
module.exports = router;