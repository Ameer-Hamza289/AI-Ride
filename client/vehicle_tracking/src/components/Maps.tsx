import React from 'react'
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
// import { IVehicle } from '../App';

const Maps = ({vehicleLocations}:any) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = { lat: 0, lng: 0 };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDDinLMpDoIMeR-ZQQ8i-uRCLcyCNZY4ME">
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={2} // Initial zoom level
    >
      {vehicleLocations.map((location:any) => (
        <Marker
          key={location.deviceId}
          position={{ lat: location.coordinates?.latitude, lng: location.coordinates?.longitude }}
        />
      ))}
    </GoogleMap>
  </LoadScript>
  )
}

export default Maps