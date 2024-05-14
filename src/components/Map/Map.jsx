import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";

import DotSensor from "../DotLoader/DotLoader";
// check this out!

//google maps import
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

import Marker from "../Marker/Marker";
import { Avatar, Box, Button, IconButton, Paper } from "@mui/material";
import Directions from "@mui/icons-material/Directions";
import NearMeIcon from "@mui/icons-material/NearMe";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return (
      <div>
        <DotSensor />
      </div>
    );
  }

  return <Map />;
}

function Map(selectedLocation) {
  const bathrooms = useSelector((store) => store.bathrooms);
  const addressCoordinates = useSelector((store) => store.addressCoordinates);
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const dispatch = useDispatch();

  // origin is the searched address from the search bar, converted into
  const [origin, setOrigin] = useState("");

  // blue dot to show current location/searched address
  const blueDot = {
    url: require("./blue_dot.png"), // path to your custom icon
    scaledSize: new google.maps.Size(30, 30), // adjust the size as needed
    origin: new google.maps.Point(0, 0),
  };

  const recenterMap = () => {
      // gets user's current location and sets coordinates in React state for directions
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch({
          type: "SAGA/SET_CURRENT_LOCATION",
          payload: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
  }

  // useMemo performs the calculation once everytime the array arg changes, reuse the same value every time it re-renders
  const center = useMemo(
    () => ({ lat: addressCoordinates.lat, lng: addressCoordinates.lng }),
    [addressCoordinates]
  );
  const selectedLocationObject = useMemo(
    () => ({ lat: selectedLocation.lat, lng: selectedLocation.lng }),
    [selectedLocation.lat, selectedLocation.lng]
  );

  // customization
  const options = useMemo(
    () => ({
      // if we disable the default map UI, it will remove the "+" and "-" buttons from the map along with Map, Satellite, and fullscreen
      disableDefaultUI: false,
      // setting clickable icons to false disables the interactivity of the Google Map - making it so you can't click on non-tinkl businesses, e.g.
      clickableIcons: false,
      gestureHandling: "greedy",
    }),
    []
  );

  const containerStyle = {
    width: "100%",
    height: "70vh",
    leftMargin: "20px",
    rightMargin: "20px",
  };

  return bathrooms && bathrooms.length > 0 ? (
    <>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={containerStyle}
        options={options}
        onLoad={onLoad}
      >
        {/* blue dot marker to searched address */}
        <MarkerF
          position={{
            lat: addressCoordinates.lat,
            lng: addressCoordinates.lng,
          }}
          icon={blueDot}
        />

        {bathrooms?.map((bathroom, i) => {
          return (
            <Marker
              key={i}
              bathroom={bathroom}
              MarkerF={MarkerF}
              InfoWindowF={InfoWindowF}
            />
          );
        })}
      </GoogleMap>
      <Avatar
        component={Paper}
        elevation={2}
        sx={{ mt: -10, ml: 3, borderRadius: 5, bgcolor: "#5272F2" }}
      >
        <IconButton onClick={() => recenterMap()}>
          <LocationSearchingIcon sx={{ color: "#FFF6F6" }}/>
        </IconButton>
      </Avatar>
    </>
  ) : (
    // otherwise, if you haven't entered a search query, renders map centered on your current location or default Minneapolis location

    <>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "70vh" }}
        center={center}
        zoom={14}
      >
        <MarkerF
          position={{
            lat: addressCoordinates.lat,
            lng: addressCoordinates.lng,
          }}
          // icon={blueDot}
        />

        {bathrooms?.map((bathroom, i) => {
          return (
            <Marker
              key={i}
              bathroom={bathroom}
              MarkerF={MarkerF}
              InfoWindowF={InfoWindowF}
            />
          );
        })}
      </GoogleMap>
      <Button variant="contained" sx={{ mt: -10 }}>
        HI THERE
      </Button>
    </>
  );
}

export default MyMap;
