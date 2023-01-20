// const { json } = require("body-parser");
const Messsage = require("../models/message");

module.exports.addMessage = async (req, res, next) => {
    const {from,to,message} = req.body;
    try {
        const {from,to,message} = req.body;
        const data = await Messsage.create({
            message:{
                text: message,
            },
            users: [
                from,
                to
            ],
            sender:from,
        });

        if(data) return res.json({ message: "Success!" });
        
        return res.json({  message: "Failed"  });

    } catch (err) {
        res.json(err.message);
    }

};

module.exports.converse = async (req, res, next) => {
    try {
        const {from,to} = req.body;
        const messages = await Messsage.find({
            users:{
                $all: [from,to],
            },
        }).sort({ updatedAt: 1 }).populate('Users');

        const projectMessages = messages.map((msg)=>{
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectMessages);
    } catch (error) {
        res.json({message: error.message});
    }
};

module.exports.allMessages = async (req, res, next) => {
     try {
        const messages  = await Messsage.find({
            _id:{ $ne:req.params.id }}
        ).populate('Users');
        return res.json(messages);
      } catch (err) {
        return res.json({message: err});
      }
};