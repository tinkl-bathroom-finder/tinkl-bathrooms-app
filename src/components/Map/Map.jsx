import React, { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import DotSensor from "../DotLoader/DotLoader";
// check this out!

//google maps import
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api"

import Marker from "../Marker/Marker";
import { Box } from "@mui/material";
import { version } from "react-dom/server";

function MyMap() {
    const { isLoaded } = useJsApiLoader({})
  if (!isLoaded) 
    { return <div><DotSensor/></div>
} else { 
  return <Map />
}}

function Map(selectedLocation) {
  const bathrooms = useSelector((store) => store.bathrooms)
  const bathroomsByDistance = useSelector((store) => store.bathroomsByDistance);
  const addressCoordinates = useSelector((store) => store.addressCoordinates);
  const mapRef = useRef();
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const dispatch = useDispatch();
   
  // origin is the searched address from the search bar, converted into 
  const [origin, setOrigin] = useState('')

    // blue dot to show current location/searched address
    const blueDot = {
      url: (require('./blue_dot.png')), // path to your custom icon
      scaledSize: new google.maps.Size(30, 30), // adjust the size as needed
      origin: new google.maps.Point(0, 0)
    };

    // useMemo performs the calculation once everytime the array arg changes, reuse the same value every time it re-renders
    const center = useMemo(() => ({lat: addressCoordinates.lat, lng: addressCoordinates.lng}), [addressCoordinates] );
    const selectedLocationObject = useMemo(() => ({lat: selectedLocation.lat, lng: selectedLocation.lng}), [selectedLocation.lat, selectedLocation.lng] );


  // customization 
  const options = useMemo(
      () => ({
          disableDefaultUI: false,
          clickableIcons: false,
          gestureHandling: 'greedy',
      }), []
  );

  const containerStyle = {
      width: '100%',
      height: '75vh',
      // leftMargin: '20px',
      // rightMargin: '20px'
  }

  return (
    (
      // if you have searched for bathrooms by proximity to your location, recenters the map on your location and shows markers close by you
      bathrooms && bathrooms.length > 0 ? (
        <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={containerStyle}
        options={options}
        onLoad={onLoad}
    >
      {/* blue dot marker to searched address */}
      <MarkerF 
      position={({lat: addressCoordinates.lat, lng: addressCoordinates.lng})}
      icon={blueDot}/>

{bathrooms?.map((bathroom, i) => {
  return (
 
      <Marker key={i} bathroom={bathroom} MarkerF={MarkerF} InfoWindowF={InfoWindowF}/>

  )
})}
    </GoogleMap>
      ) : (
      // otherwise, if you haven't entered a search query, renders map centered on your current location or default Minneapolis location
      <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      center={center}
      zoom={14}
    >

    <MarkerF 
    position={({lat: addressCoordinates.lat, lng: addressCoordinates.lng})}
    icon={blueDot}/>
    
   {bathrooms?.map((bathroom, i) => {
  return (
 
      <Marker key={i} bathroom={bathroom} MarkerF={MarkerF} InfoWindowF={InfoWindowF}/>

  )
})}

    </GoogleMap>
   )
   )
  )
}

export default MyMap;
