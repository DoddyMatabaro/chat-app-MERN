const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const messageSchema = new Schema({   
    chatroom: {
        type: mongoose.Schema.Types.ObjectId, 
        required:"Chatroom is required", 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required:"user is required", 
        ref:"users"
    },
    message:{
        type: String,
        required: 'message is required',
    }
});
  
module.exports = mongoose.model("Message", messageSchema)