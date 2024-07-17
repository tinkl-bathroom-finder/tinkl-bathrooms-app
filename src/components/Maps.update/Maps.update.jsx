import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

export const MapsUpdate = () => {
    const addressCoordinates = useSelector((store) => store.addressCoordinates);

    useEffect(() => {
        console.log(addressCoordinates);
        console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    })

    return (
        <APIProvider
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            onLoad={() => console.log('Maps API Loaded')}
        >
            <Map
                defaultZoom={13}
                defaultCenter={{ lat: addressCoordinates.lat, lng: addressCoordinates.lng }}
                onCameraChanged={(ev) => {
                    console.log('camera Changed', ev.detail.center, 'zoom:', ev.detail.zoom)
                }
                }>

            </Map>
        </APIProvider>
    )
}