// MapComponent.js
import { MapContainer, TileLayer, Marker } from 'react-leaflet'; 
import 'leaflet/dist/leaflet.css'; 

function Map({ location }) {
  return (
    <MapContainer center={location} zoom={5} scrollWheelZoom={false} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={location}></Marker>
    </MapContainer>
  );
}

export default Map;
