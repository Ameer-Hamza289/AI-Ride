const express=require("express");
const router=express.Router();

const Vehicle = require('../model/VehicleModel');


router.post("/add-vehicle", async (req, res) => {
  const { userId, name, deviceId, plate_number } = req.body;

  try {
    const existingVehicle = await Vehicle.find({plate_number});
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle already exists" });
    }
    const newVehicle = new Vehicle({
      userId,
      name,
      deviceId,
      plate_number,
    });
    await newVehicle.save();
    res.status(201).json({ message: "Vehicle added successfully" });
    io.emit("vehicle-added", newVehicle); // Broadcast to connected clients
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding vehicle" });
  }
});

router.get('/vehicles', async (req, res) => {
  const userId = req.user.userId; // retrieve user ID through auth

  try {
    const vehicles = await Vehicle.find({ userId });
    res.status(200).json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching vehicles' });
  }
});

router.put("/update-vehicle/:vehicleId",async(req,res)=>{
  const {formData}=req.body
  const vehicleId=req.params.vehicleId;
  try {
    const updatedVehicle=await Vehicle.findByIdAndUpdate(vehicleId,formData);
    res.status(200).json(updatedVehicle)
  } catch (error) {
    console.error("Error while updating vehicle ",error)
  }
})

router.delete("delete-vehicle/:vehicleId",async(req,res)=>{
  try {
    const vehicleId=req.params.vehicleId;
    const vehicle=await Vehicle.findByIdAndDelete({vehicleId});
    if(!vehicle){
      res.status(400).json({message:"Vehicle not found"});
    }

    return res.status(204).json({message:"Vehicle deleted successfully!"});
  } catch (error) {
    console.error("Error deleting vehicle", error);
    return res.status(500).json({message:"Couldn't delete vehicle"})
  }
})

module.exports=router;