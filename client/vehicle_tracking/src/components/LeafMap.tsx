
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";


const LeafMaps = ({vehicleLocations}:any) => {
  // const position = [51.505, -0.09]
  console.log(vehicleLocations,"Loc");
  

  return (
    <div style={{ padding:"10px", overflow:"hidden", maxHeight:"500px", width:"fit-content" }}>
    {/* <MapContainer center={[51.505, -0.09]} zoom={1} style={{ maxHeight: '400px', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]}><Popup>A vehicle</Popup></Marker>
    </MapContainer> */}
    {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer> */}
   <LeafletMap center={[0, 0]} zoom={2} style={{  width: '100%' }} scrollWheelZoom={false}>
      {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      /> */}
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      {/* {vehicleLocations.map((location) => ( */}
        <Marker key={vehicleLocations.deviceId} position={[vehicleLocations.coordinates?.latitude, vehicleLocations.coordinates?.longitude]}>
          <Popup>
            Vehicle ID: {vehicleLocations.deviceId}, Latitude: {vehicleLocations.coordinates?.latitude}, Longitude: {vehicleLocations.coordinates?.longitude}
          </Popup>
        </Marker>
      {/* ))} */}
    </LeafletMap>
  </div>
  )
}

export default LeafMaps
