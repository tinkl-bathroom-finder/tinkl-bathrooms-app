import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import blueDotIconFile from '../Map/blue_dot.png';
import toiletIconFile from '../Marker/toilet-marker.png';
import { Button } from '@mui/material';

export const LeafletMap = () => {
    const user = useSelector(state => state.primaryUser);
    const bathroomData = useSelector(state => state.bathroomData);
    const center = user.location.lat && user.location.lng ? [user.location.lat, user.location.lng] : [44.9560534624369, -93.16002444658359];

    useEffect(() => {
        console.log(user.location);
    });

    const blueDotIcon = new Icon({
        iconUrl: blueDotIconFile,
        iconSize: [25, 25], // size of the icon
        iconAnchor: [5, 5], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -5] // point from which the popup should open relative to the iconAnchor
    });

    const toiletIcon = new Icon({
        iconUrl: toiletIconFile,
        iconSize: [25, 25],
        iconAnchor: [5, 5],
        popupAnchor: [0, -5]
    });


    return (
        <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
                position={center}
                icon={blueDotIcon}
            >
                {bathroomData.map((item, index) => {
                    const position = [item.latitude, item.longitude];
                    return (
                        <Marker
                            position={position}
                            icon={toiletIcon}
                            alt={item.name}
                        >
                            <Popup>
                                <p>{item.name}</p>
                                <Button>Flag</Button>
                                <Button>Like</Button>

                            </Popup>
                        </Marker>
                    )
                })
                }
            </Marker>
        </MapContainer>
    );
};
