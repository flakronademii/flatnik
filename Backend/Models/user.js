var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
     userRole:{
      type:String,
      enum:['user','admin'],
      default:'user',
     }

}, { timestamps: true });
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
