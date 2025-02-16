const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,'this is required']
},
email:{
    type:String,
    required:[true,'this is required']
},
password:{
    type:String,
    required:[true,'this is required']
}
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel