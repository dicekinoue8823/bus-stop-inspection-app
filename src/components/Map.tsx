import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
// Fix for marker icons not showing correctly
/* eslint-disable */
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src,
});
/* eslint-disable */

interface MapProps {
    coordinates: { lat: number; lng: number }[];
}


const Map: React.FC<MapProps> = ({ coordinates }) => {
    // const { location, error } = useCurrentLocation();
    return (

        // <MapContainer center={[35.168643, 136.910271]} zoom={16} className="mx-2 my-2 h-screen w-96">
        // {location ? (
        <MapContainer center={[35.168643, 136.910271]} zoom={16} className="mx-2 my-2 h-screen w-full">
            {/*<MapContainer center={[location?.lat, location?.lng]} zoom={16} className="mx-2 my-2 h-screen w-full">*/}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coordinates.map((coord, index) => (
                <Marker key={index} position={[coord.lat, coord.lng]}>
                    <Popup>
                        Lat: {coord.lat}, Lng: {coord.lng}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
