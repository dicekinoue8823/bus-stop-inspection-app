import { useState } from 'react';
import axios from 'axios';

interface BusStop {
    id: number;
    lat: number;
    lng: number;
    name: string;
}

const useBusStops = () => {
    const [busStops, setBusStops] = useState<BusStop[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getBusStops = async (lat: number, lng: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://overpass-api.de/api/interpreter?data=[out:json];node(around:1000,${lat},${lng})[highway=bus_stop];out;`
            );

            const busStopsData = response.data.elements.map((element: any) => ({
                id: element.id,
                lat: element.lat,
                lng: element.lon,
                name: element.tags.name || 'Unknown',
            }));

            setBusStops(busStopsData);
        } catch (error) {
            setError('Failed to fetch bus stops data');
        }

        setLoading(false);
    };

    return { busStops, error, loading, getBusStops };
};

export default useBusStops;
