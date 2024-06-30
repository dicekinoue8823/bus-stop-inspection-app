"use client";

import React from 'react';
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { Button } from "@/components/ui/button"
import { PropagateLoader } from "react-spinners";

const Home: React.FC = () => {
    const { location, error, loading, getLocation } = useCurrentLocation();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
            <h1 className="text-3xl font-bold mb-4">現在位置取得</h1>
            <div className="mb-4">
                <Button
                    onClick={getLocation}
                    disabled={loading}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    {loading ? <PropagateLoader /> : 'Current Location'}
                </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {location && (
                <div>
                    <p className="text-lg">Latitude: {location.lat}</p>
                    <p className="text-lg">Longitude: {location.lng}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
