import React, { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DotLoader } from "react-spinners"

//google maps import
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api"

import Marker from "../Marker/Marker";
import { Box } from "@mui/material";

function MyMap() {
    const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY })
  if (!isLoaded) { return <div><DotLoader/></div>}

  return       <Map />
  
}

function Map() {
  const bathrooms = useSelector((store) => store.bathrooms)
  const mapRef = useRef();
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const dispatch = useDispatch();

  // sets starting center location 
  const [centerLat, setCenterLat] = useState(44.977753)
  const [centerLng, setCenterLng] = useState(-93.2650108)

    // useMemo performs the calculation once everytime the array arg changes, reuse the same value every time it re-renders
    const center = useMemo(() => ({lat: centerLat, lng: centerLng}), [centerLat, centerLng] );

    // const center = {lat: centerLat, lng: centerLng }

  useEffect(() => {
      // centers Map on user location
    //   navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //           setCenterLat(position.coords.latitude)
    //           setCenterLng(position.coords.longitude)
    //       })
  }, []);


  // customization 
  const options = useMemo(
      () => ({
          disableDefaultUI: true,
          clickableIcons: false,
          gestureHandling: 'greedy',
      }), []
  );

  const containerStyle = {
      width: '80vw',
      height: '70vh',
      leftMargin: '20px',
      rightMargin: '20px'
  }

  return (
      <GoogleMap
          zoom={14}
          center={center}
          mapContainerStyle={containerStyle}
          options={options}
          onLoad={onLoad}
      >
{bathrooms && bathrooms.map((bathroom, i) => {
    return (
   
        <Marker key={i} bathroom={bathroom} MarkerF={MarkerF} InfoWindowF={InfoWindowF}/>
  
    )
})}
      </GoogleMap>
  )
}

export default MyMap;
