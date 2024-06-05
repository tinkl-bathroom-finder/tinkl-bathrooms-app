import React, { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import DotSensor from "../DotLoader/DotLoader";
// check this out!

//google maps import
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api"

import Marker from "../Marker/Marker";

function MyMap() {
  const { isLoaded } = useJsApiLoader({})
  if (!isLoaded) {
    return <div><DotSensor /></div>
  } else {
    return <Map />
  }
}

function Map(selectedLocation) {
  const bathrooms = useSelector((store) => store.bathrooms);
  const addressCoordinates = useSelector((store) => store.addressCoordinates);
  const mapRef = useRef();
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const [height, setHeight] = useState();

  useEffect(() => {
    setHeight(window.innerHeight);
  }, [window.innerHeight, window.innerWidth])

  // origin is the searched address from the search bar, converted into 
  const [origin, setOrigin] = useState('')

  // blue dot to show current location/searched address
  const blueDot = {
    url: (require('./blue_dot.png')), // path to your custom icon
    scaledSize: new google.maps.Size(30, 30), // adjust the size as needed
    origin: new google.maps.Point(0, 0)
  };

  // useMemo performs the calculation once everytime the array arg changes, reuse the same value every time it re-renders
  const center = useMemo(() => ({ lat: addressCoordinates.lat, lng: addressCoordinates.lng }), [addressCoordinates]);
  const selectedLocationObject = useMemo(() => ({ lat: selectedLocation.lat, lng: selectedLocation.lng }), [selectedLocation.lat, selectedLocation.lng]);


  const recenterMap = () => {
    mapRef.current.panTo(center);
  }

  // customization 
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: 'greedy',
    }), []
  );

  const containerStyle = {
    width: '100%',
    height: height * 0.65,
    leftMargin: '0px',
    rightMargin: '0px',
  }


  return (
    <div style={containerStyle}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: (height * 0.65) }}
        zoom={15}
        center={center}
        options={options}
        onLoad={onLoad}>
        {/* Creates blue location dot */}
        <MarkerF
          position={({ lat: addressCoordinates.lat, lng: addressCoordinates.lng })}
          icon={blueDot}
        />
        {/* Maps bathroom locations from database onto map locations */}
        {bathrooms.map((bathroom, i) => (
          <Marker key={i} bathroom={bathroom} MarkerF={MarkerF} InfoWindowF={InfoWindowF} />
        ))}
      </GoogleMap>
      <Button onClick={recenterMap}>
        <MyLocationOutlinedIcon />
      </Button>


    </div>
  )
}

export default MyMap;
