const message = require("../models/message");

module.exports.addMessage = async (req, res, next) => {
    try {
        const {from,to,message} = req.body;
        const data = await messageModel.create({
            message:{
                text: message
            },
            users: [
                from,
                to
            ],
            sender:from,
        });

        if(data) return res.json({
            msg: "Success!"
        });
        return res.json({ 
            msg: "Failed"
        });

    } catch (err) {
        next(err);
    }
};


