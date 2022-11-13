const {signOut, signUp, signIn} = require("../controllers/auth");

  router.post('/signout', signOut);

  router.post('/signup', signUp);

  router.post("/signin",  signIn);
  
module.exports = router;