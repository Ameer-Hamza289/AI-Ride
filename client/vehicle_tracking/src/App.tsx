
// import './App.css'
import {  useEffect, useState } from 'react';
import io from 'socket.io-client';


interface IVehicle{
name:string 
registration_number:string 
deviceId:string 
coordinates:{
  longitude:string
  latitude:string 
}
}

function App() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  console.log(vehicles);
  

  useEffect(() => {
    window.process = {
      ...window.process,
    };  
  }, []);
  
  // const socketServerURL=process.env.VITE_SOCKET_SERVER_URL;
useEffect(()=>{
  // if(socketServerURL){
  //   const socket = io(socketServerURL)
  //   console.log(socket);
  //   console.log(socketServerURL);

  // }
  const socket = io("http://localhost:8004");

  socket.on('vehicle-location-update', (updatedVehicle) => {
    
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.deviceId === updatedVehicle.deviceId
          ? { ...vehicle, ...updatedVehicle }
          : vehicle
      )
    );

console.log(vehicles,"vehicles");



  });

  return () => {
    socket.disconnect();
  };
  

},[])

  return (
    <>
 <h1>Vehicle Tracking</h1>
      {/* Render vehicle locations on the map or list */}
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.deviceId}>
            Vehicle ID: {vehicle.deviceId}, Latitude: {vehicle?.coordinates?.latitude}, Longitude: {vehicle?.coordinates?.longitude}
          </li>
        ))}
      </ul>    </>
  )
}

export default App
