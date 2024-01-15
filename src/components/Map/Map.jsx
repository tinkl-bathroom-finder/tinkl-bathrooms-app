import React, { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DotLoader } from "react-spinners"

//google maps import
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"

import Marker from "../Marker/Marker";

function MyMap() {
    const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE",
})
// // centers map on Minneapolis by default
  // const center = {
  //   lat: 44.978145599365234, // default latitude
  //   lng: -93.26353454589844, // default longitude
  // };
  // const apiKey=process.env.GOOGLE_MAPS_API_KEY
  // const libraries = ["places"];
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE",
  //   libraries,
  // });
  // const mapContainerStyle = {
  //   width: "400px",
  //   height: "400px",
  // };

  // if (loadError) { return <div>Error loading maps</div>}

  if (!isLoaded) { return <div><DotLoader/></div>}



  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE",
  // });

  // const [map, setMap] = React.useState(null);

  // const onLoad = React.useCallback(function callback(map) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);

  //   setMap(map);
  // }, []);

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  return (
    <div id="map-container">
      <Map />
    </div>
  );
}

// Map is called in the return of MainMap 
function Map() {

  const locations = useSelector((store) => store.locations)
  const mapRef = useRef();
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const dispatch = useDispatch();

  // sets starting center location 
  const [centerLat, setCenterLat] = useState(0)
  const [centerLng, setCenterLng] = useState(0)

  //set center
  const center = { lat: centerLat, lng: centerLng }

  useEffect(() => {
      // centers Map on user location
      navigator.geolocation.getCurrentPosition(
          (position) => {
              setCenterLat(position.coords.latitude)
              setCenterLng(position.coords.longitude)
          })
      // dispatch({ type: 'SAGA/FETCH_BATHROOMS' });
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
      width: '80%',
      height: '500px',
      leftMargin: '20px',
      rightMargin: '20px'
  }

  return (
      <GoogleMap
          zoom={15}
          center={center}
          mapContainerStyle={containerStyle}
          options={options}
          onLoad={onLoad}
      >

      </GoogleMap>
  )
}

export default MyMap;
