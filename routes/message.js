const { addMessage, allMessages } = require("../controllers/message");


const router = require("express").Router();

router.post("/send/", addMessage);
router.post("/messages/", allMessages);



module.exports = router;