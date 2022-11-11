const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
  
  
const UserSchema = new Schema({   
    username: {type: String, required:"Username is required", unique:true},
    picture:{
        type:String,
        required: "Profile picture is required",
        default: 'xyz'
    },
    },
    {
        timestamps: true,
    }
);
  
// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);
  
// export userschema
module.exports = mongoose.model("users", UserSchema)