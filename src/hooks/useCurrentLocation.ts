import { useState } from 'react';

interface Location {
    lat: number;
    lng: number;
}

const useCurrentLocation = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setLoading(true);

        const onSuccess = (position: GeolocationPosition) => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            setError(null);
            setLoading(false);
        };

        const onError = (error: GeolocationPositionError) => {
            setError(error.message);
            setLoading(false);
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };

    return { location, error, loading, getLocation };
};

export default useCurrentLocation;