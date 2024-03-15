import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

const GoogleMap = () => {
  const position = {lat: 31.504642, lng: 74.366941};
  // 31.504642, 74.366941
  return (
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map defaultCenter={position} zoom={10}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  )
}

export default GoogleMap
