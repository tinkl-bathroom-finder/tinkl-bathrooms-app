// MapView.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api"

import { useSelector } from 'react-redux';

export const MapView = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);

    const user = useSelector((state) => state.primaryUser);
    const bathroomData = useSelector((state) => state.bathroomData);
    const apikey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const defaultCenter = {
        lat: user.location?.lat || 44.9560534624369,
        lng: user.location?.lng || -93.16002444658359,
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apikey
    });

    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds(defaultCenter);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, [])

    const blueDot = {
        url: (require('../Map/blue_dot.png')), // path to your custom icon
        scaledSize: new google.maps.Size(30, 30), // adjust the size as needed
        origin: new google.maps.Point(0, 0)
    };

    const toiletIcon = {
        url: (require('../Marker/toilet-marker.png')), // path to your custom icon
        scaledSize: new google.maps.Size(50, 50), // adjust the size as needed
        origin: new google.maps.Point(0, 0)
    };

    const showInfoWindow = (id) => {
        const item = bathroomData.filter((item) => item.id === id);
        console.log(item);
    }

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={defaultCenter}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <MarkerF
                position={({ lat: user.location.lat, lng: user.location.lng })}
                icon={blueDot} />

            {bathroomData.map((item, index) => (
                < MarkerF
                    position={{ lat: item.latitude, lng: item.longitude }}
                    icon={toiletIcon}
                    key={index}
                    onClick={() => showInfoWindow(item.id)} />
            )
            )}

        </GoogleMap>
    )

};
