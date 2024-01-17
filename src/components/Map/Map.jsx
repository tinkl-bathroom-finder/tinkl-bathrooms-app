import React, { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DotLoader } from "react-spinners"

//google maps import
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"

import Marker from "../Marker/Marker";
import { Box } from "@mui/material";

function MyMap() {
    const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
})

const bathrooms = useSelector((store) => store.bathrooms)

  if (!isLoaded) { return <div><DotLoader/></div>}

  return (
    <Box  
    sx={{
      width: 390,
      mr: 'auto',
      ml: '20px',
      my: '20px'
      }}
  >
      <Map />
    </Box>
  );
}

function Map() {

  const locations = useSelector((store) => store.locations)
  const mapRef = useRef();
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const dispatch = useDispatch();
  const bathrooms = useSelector((store) => store.bathrooms)

  // sets starting center location 
  const [centerLat, setCenterLat] = useState(0)
  const [centerLng, setCenterLng] = useState(0)

    // useMemo performs the calculation once everytime the array arg changes, reuse the same value every time it re-renders
    // const center = useMemo(() => ({lat: centerLat, lng: centerLng}), [centerLat, centerLng] );

    const center = {lat: centerLat, lng: centerLng }

//   useEffect(() => {
//       // centers Map on user location
//       navigator.geolocation.getCurrentPosition(
//           (position) => {
//               setCenterLat(position.coords.latitude)
//               setCenterLng(position.coords.longitude)
//           })
//   }, []);


  // customization 
  const options = useMemo(
      () => ({
          disableDefaultUI: true,
          clickableIcons: false,
          gestureHandling: 'greedy',
      }), []
  );

  const containerStyle = {
      width: '400px',
      height: '600px',
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
   
        <Marker key={i} bathroom={bathroom}/>
  
    )
})}
      </GoogleMap>
  )
}

export default MyMap;
