'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const MapPage: React.FC = () => {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }[]>([]);

    const addCoordinate = () => {
        if (lat && lng) {
            setCoordinates([...coordinates, { lat: parseFloat(lat), lng: parseFloat(lng) }]);
            setLat('');
            setLng('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">OpenStreetMap Marker App</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Latitude"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button
                    onClick={addCoordinate}
                    className="bg-blue-500 text-white p-2"
                >
                    Add Coordinate
                </button>
            </div>

            <Map coordinates={coordinates} />
        </div>
    );
};

export default MapPage;
