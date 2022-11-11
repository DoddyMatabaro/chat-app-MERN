const Chatroom = require('../models/chatRoom')

exports.createChatroom = async (req, res)=>{
    const { name } = req.body;

    const nameRegex  = /^[A-Za-z\S]+$/;

    if(!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

    const chatroomExists = await Chatroom.findOne({ name});

    if(chatroomExists) throw "Chatroom with this name already exists!";

    const chatroom = new Chatroom({
        name,
    })    
}