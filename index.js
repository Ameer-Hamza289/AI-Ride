const express=require("express");
const app=express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv=require("dotenv");
const {verifyAccessToken}=require("./utils/verifyToken")
dotenv.config();

const {connectDB}=require("./db")

app.use(cors({ origin: 'http://localhost:3000',credentials:true }));
app.use(bodyParser.json());




connectDB();
const server=app.listen(process.env.PORT,()=>{
  console.log(`Server is listening on port ${process.env.port}`);
})

module.exports=server;


