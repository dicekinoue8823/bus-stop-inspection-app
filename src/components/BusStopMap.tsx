import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import Link from "next/link";

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

interface BusStop {
    id: number;
    lat: number;
    lng: number;
    name: string;
}

interface MapProps {
    center: { lat: number; lng: number };
    busStops: BusStop[];
}

const BusStopMap: React.FC<MapProps> = ({ center, busStops }) => {
    return (
        <MapContainer center={center} zoom={15} className="h-screen w-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {busStops.map((stop) => (
                <Marker key={stop.id} position={[stop.lat, stop.lng]}>
                    <Popup>{stop.name}</Popup>

                        {/*<Link href="/">*/}
                        {/*    <a>{stop.name}</a>*/}
                        {/*</Link>*/}

                </Marker>
            ))}
        </MapContainer>
    );
};

export default BusStopMap;
