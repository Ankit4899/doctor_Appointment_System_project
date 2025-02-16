const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log(`Database connect ${mongoose.connection.host}`.bgGreen.white);
    }catch(err){
        console.log(`Database server issue ${err}`.bgRed.white)
    }
};

module.exports = connectDB;