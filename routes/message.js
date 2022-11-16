const { addMessage, allMessages, converse } = require("../controllers/message");

const router = require("express").Router();

router.post("/send", addMessage);
router.post("/messages", allMessages);
router.post("/converse", converse);

module.exports = router;