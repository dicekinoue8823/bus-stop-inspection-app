// 'use client';
import { useState, useEffect } from 'react';

interface Location {
    lat: number;
    lng: number;
}

const useCurrentLocation = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        const onSuccess = (position: GeolocationPosition) => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        };

        const onError = (error: GeolocationPositionError) => {
            setError(error.message);
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        // No cleanup needed for getCurrentPosition
        return () => {};
    }, []);

    return { location, error };
};

export default useCurrentLocation;