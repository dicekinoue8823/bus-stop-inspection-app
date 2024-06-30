"use client";
import React, { useState, useEffect } from 'react';
import useCurrentLocation from "@/hooks/useCurrentLocation";
import useBusStops from "@/hooks/useBusStops";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button"
import { PropagateLoader } from "react-spinners";

const Map = dynamic(() => import("@/components/BusStopMap"), { ssr: false });

const YourLocation: React.FC = () => {
    const { location, error: locationError, loading: locationLoading, getLocation } = useCurrentLocation();
    const { busStops, error: busStopsError, loading: busStopsLoading, getBusStops } = useBusStops();
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (location) {
            setMapCenter(location);
            getBusStops(location.lat, location.lng);
        }
    }, [location, getBusStops]);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">バス停留所（最寄り）</h1>
            <div className="mb-4 text-center">
                <Button
                    onClick={getLocation}
                    // disabled={locationLoading || busStopsLoading}
                    disabled={locationLoading}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    {/*{locationLoading || busStopsLoading ? 'Loading...' : 'Get Nearby Bus Stops'}*/}
                    {locationLoading ? <PropagateLoader /> : 'バス停-検索'}
                </Button>
            </div>
            {(locationError || busStopsError) && <p className="text-red-500 text-center">{locationError || busStopsError}</p>}
            {mapCenter && (
                <Map center={mapCenter} busStops={busStops} />
            )}
        </div>
    );
};

export default YourLocation;
