const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
  
  
const UserSchema = new Schema({   
    username: {type: String, required:true, unique:true},
});
  
// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);
  
// export userschema
module.exports = mongoose.model("users", UserSchema)