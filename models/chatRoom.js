const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const ChatRoom = new Schema({   
    name: {
        type: String, 
        required:"Name is required", 
    },
});

  
// export userschema
module.exports = mongoose.model("Chatroom", ChatRoom)