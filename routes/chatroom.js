const router = require('express').Router();
const chatroomController = require('../controllers/chatroom');

const auth = require('../middlewares/auth');

router.post("/",auth,chatroomController.createChatroom);

module.exports = router;
