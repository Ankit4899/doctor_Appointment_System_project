const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
// mongoose connection
connectDB();
const app = express();

app.use(express.json());
app.use(morgan('dev'));


// app.get('/',(req,res)=>{
//     res.status(200).send({
//         message:"server running",
//     });
// });

app.use("/api/v1/user",require("./routes/userRoutes"));

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("Server is running".green);
})

