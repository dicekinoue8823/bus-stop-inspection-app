"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { useRouter } from 'next/router';
import {PropagateLoader} from "react-spinners";

interface BusStop {
    id: string;
    name: string;
    lat: number;
    lon: number;
}

const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const SetViewOnClick = ({ coords }: { coords: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(coords, map.getZoom());
    }, [coords, map]);
    return null;
};

const MapSelect = () => {
    // const router = useRouter();
    const [location, setLocation] = useState<[number, number]>([35.18148265, 136.90730348]); // 初期緯度経度を設定
    const [busStops, setBusStops] = useState<BusStop[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedStopName, setSelectedStopName] = useState<string>('');

    const fetchBusStops = async (lat: number, lon: number) => {
        setLoading(true);
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[highway=bus_stop](around:1000,${lat},${lon});out;`;
        const response = await fetch(overpassUrl);
        const data = await response.json();
        const stops = data.elements.map((element: any) => ({
            id: element.id,
            name: element.tags.name || 'Unnamed Stop',
            lat: element.lat,
            lon: element.lon,
        }));
        setBusStops(stops);
        setLoading(false);
    };

    const handleSearch = () => {
        setLoading(true);
        setSelectedStopName(''); // バス停名の入力項目をクリア
        navigator.geolocation.getCurrentPosition((position) => {
            const newLocation: [number, number] = [position.coords.latitude, position.coords.longitude];
            setLocation(newLocation);
            fetchBusStops(newLocation[0], newLocation[1]);
        });
    };

    const handleBusStopSearch = () => {
        // if (selectedStopName) {
        //     router.push(`/map/select_busstop/search?busStopName=${selectedStopName}`);
        // }
        console.log(selectedStopName);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation([position.coords.latitude, position.coords.longitude]);
        });
    }, []);

    return (
        <div>
            <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 text-white bg-blue-500 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {/*{loading ? 'Searching...' : 'Find Bus Stops'}*/}
                    {loading ? <PropagateLoader /> : '現在地周辺-バス停検索'}
                </button>
            </div>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    className="border p-2 w-full max-w-md"
                    placeholder="Selected Bus Stop Name"
                    value={selectedStopName}
                    readOnly
                />
                <button
                    className="px-4 py-2 ml-2 text-white bg-green-500 rounded"
                    // onClick={handleBusStopSearch}
                    disabled={!selectedStopName}
                >
                    Search
                </button>
            </div>
            <MapContainer center={location} zoom={13} style={{height: '600px', width: '100%'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={location} icon={defaultIcon}>
                    <Popup>Your Location</Popup>
                </Marker>
                {busStops.map((stop) => (
                    <Marker key={stop.id} position={[stop.lat, stop.lon]} icon={defaultIcon}>
                        <Popup eventHandlers={{ add: () => setSelectedStopName(stop.name) }}>
                            {stop.name}
                        </Popup>
                    </Marker>
                ))}
                <SetViewOnClick coords={location} />
            </MapContainer>
        </div>
    );
};

export default MapSelect;
