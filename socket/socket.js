const {server}=require("../index")
const io=require('socket.io')(server);
const Vehicle=require("../model/VehicleModel")


io.on("connection",(socket)=>{
  console.log("connected");


  socket.on("gps-data", async (data) => {
    const { deviceId, latitude, longitude } = data;
    await Vehicle.findOneAndUpdate(
      { deviceId },
      {
        coordinates: {
          latitude,
          longitude,
        },
      }
    )
      .then(() => {
        io.emit("vehicle-location-update", { deviceId, latitude, longitude });
      })
      .catch((err) => {
        console.error("Error while updating vehicle location", err);
      });
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected:', socket.id);
});



})
