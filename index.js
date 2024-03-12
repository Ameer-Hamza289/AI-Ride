const express=require("express");
const app=express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv=require("dotenv");
const {verifyAccessToken}=require("./utils/verifyToken")
dotenv.config();

const {connectDB}=require("./db")

app.use(cors({ origin: 'http://localhost:5173',credentials:true }));
app.use(bodyParser.json());

const vehicleRoutes=require("./Controller/VehicleController");
const authRoutes=require("./Controller/authController");



app.use("/api/auth/",authRoutes);

app.use(verifyAccessToken)

app.use("/api/",vehicleRoutes)


connectDB();
const server=app.listen(process.env.PORT,()=>{
  console.log(`Server is listening on port ${process.env.port}`);
})

module.exports=server;


