import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
// import { IVehicle } from '../App';

// const Maps = ({vehicleLocations}:any) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

//   const center = { lat: 0, lng: 0 };
  

//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//     <GoogleMap
//       mapContainerStyle={mapContainerStyle}
//       center={vehicleLocations}
//       zoom={2} 
//     >
//         <Marker
//           key={vehicleLocations.deviceId}
//           position={{ lat: vehicleLocations.coordinates?.latitude, lng: vehicleLocations.coordinates?.longitude }}
//         />
//     </GoogleMap>
//   </LoadScript>
//   )
// }
const Maps=()=>{
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
        mapContainerStyle={mapContainerStyle}
          // mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
        </GoogleMap>
      )}
    </div>
  );
}

export default Maps