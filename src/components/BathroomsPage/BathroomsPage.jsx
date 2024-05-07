import React, { useMemo, useRef, useCallback, useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import Marker from "../Marker/Marker";

import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
// import { Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import BathroomItem from "../BathroomItem/BathroomItem";
import BathroomItemMap from "../BathroomItem/BathroomItemMap";
// const dotenv = require('dotenv').config();

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
// need to require dot env if we use it I believe
import MyMap from "../Map/Map";
import { Button, Box } from "@mui/material";
import FilterByModal from "./FilterByModal";


function BathroomsPage() {
  const dispatch = useDispatch();

  // const store = useSelector((store) => store);
  const bathrooms = useSelector((store) => store.bathrooms);
  const bathroomsByDistance = useSelector((store) => store.bathroomsByDistance);
  const addressCoordinates = useSelector((store) => store.addressCoordinates);

  // captures value of address typed in search bar as local state
  const [searchBarAddress, setSearchBarAddress] = useState("");
  const mapView = useSelector((store) => store.mapView);
  // state to open or close FilterByModal
  const [modalShow, setModalShow] = useState(false);

  const [show, setShow] = useState(false);

  // state for filter by toggles (open now, wheelchair accessible, single-stall, changing table)
  const [isChecked, setIsChecked] = useState(false);
  const handleClose = () => setShow(false);
  
  // origin is the searched address from the search bar, converted into 
  const [origin, setOrigin] = useState('')
  const [currentLat, setCurrentLat] = useState(44.979225);
  const [currentLng, setCurrentLng] = useState(-93.266945);

  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 });
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const mapRef = useRef();
  // const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  const blueDot = {
    url: (require('./blue_dot.png')), // path to your custom icon
    scaledSize: new google.maps.Size(30, 30), // adjust the size as needed
    origin: new google.maps.Point(0, 0)
  };

const selectedCenter = useMemo(() => ({lat: selectedLocation.lat, lng: selectedLocation.lng}), [selectedLocation.lat, selectedLocation.lng] );

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
      height: '65vh',
      leftMargin: '20px',
      rightMargin: '20px',
      bottomMargin: '20px',
      borderRadius: '8px'
  }

     // useMemo performs the calculation once everytime the array arg changes, reuses the same value every time it re-renders
     const center = useMemo(() => ({lat: addressCoordinates.lat, lng: addressCoordinates.lng }), [addressCoordinates] );

  useEffect(() => {
        // gets user's current location and sets coordinates in React state for directions
        navigator.geolocation.getCurrentPosition(
          (position) => {

            setCurrentLat(position.coords.latitude)
            setCurrentLng(position.coords.longitude)
          });
    (dispatch({
      type: 'SAGA/FETCH_BATHROOMS',
    }))
  }, []);

  // sends address types into Autocomplete box to server to get bathrooms list
  const sendLocation = () => {
    // Ensures that sendLocation isn't triggered when search box is cleared
    if (searchBarAddress === null) {
      return;
    }
    else if (searchBarAddress !== "") {
      console.log("searchBarAddress: ", searchBarAddress)
      // converts address to url-friendly string 
      const convertedAddress = searchBarAddress.value.description.split(" ").join("%20");
      try { 
        setOrigin(convertedAddress)
        dispatch({
          type: "SAGA/SEND_LOCATION",
          payload: convertedAddress,
        });
       } catch (err) {
        console.log('Error sending location: ', err)
       }
  
    } 
    // else if (currentLat) {
    //   (dispatch({
    //     type: 'SAGA/FETCH_BATHROOMS',
    //     payload: {
    //         lat: currentLat,
    //         lng: currentLng
    //     }
    //   }))
    // }
     
  };

  // function to toggle between map and list view
  // 🔥🔥🔥🔥🔥 should be refactored at some point bc "Map View" button is no longer a toggle switch (it's a button)
  const toggleView = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    dispatch({
      type: 'TOGGLE_VIEW',
    });
  };

  // TODO: Can this function now be removed?
  const clearInput = () => {
    setSearchBarAddress('')
  }

  // Ensures searchBarAddress is set in state before executing sendLocation()
  useEffect(() => {
    if (searchBarAddress !== '') {
    menuClosed()}
  }, [searchBarAddress])

  // Runs when search menu is closed, allowing whatever has been selected to be sent to sendLocation()
  const menuClosed = () => {
    if (searchBarAddress == "") {
      console.log('Search bar is empty');
    } else {
    sendLocation();}
  }
  // Runs when search menu is opened, emptying the menu of text
  const menuOpened = () => {
    if (searchBarAddress !== '') {
      setSearchBarAddress('');}
  }

  // const apiKey=process.env.GOOGLE_MAPS_API_KEY

  return (
    <Box className="container" sx={{mt: 6, width: 9/10}}>
        
      {/* AutoComplete search box */}
          <GooglePlacesAutocomplete
          
          apiKey="AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE"
          selectProps={{
            className:"searchBar", // Provides the component with a class for styling
            isClearable: true, // Allows the textbox to be emptied with X
            onBlur: () => menuClosed(), // Triggers menuClosed() when clicking off of the textbox
            onMenuOpen: () => menuOpened(), // Triggers textbox to clear when clicking on it
            //onMenuClose: () => menuClosed(), // Triggers menuClosed() although may be redundant
            value: searchBarAddress,
            onChange: setSearchBarAddress,
            placeholder: 'Enter an address', // Sets the placeholder for textbox
            styles: {
              input: (provided) => ({
                  ...provided,
                  color: 'black',
              }),
              // Removes highlight on hover
              option: (provided) => ({
                  ...provided,
                  color: 'black',
                  background: '#00000000',
              }),
              singleValue: (provided) => ({
                  ...provided,
                  // color: "blue",
                  // background:"black"
              }),
              control: (provided) => ({
                  ...provided,
                  width: '100%',
                  // background: 'rgba(255, 255, 255, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.41)',
                  backdropFilter: 'blur(50px)',
                  borderRadius: '20px',
              }),
              menu: (provided) => ({
                  ...provided,
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.41)',
                  backdropFilter: 'blur(50px)',
                  borderRadius: '12px',
              }),
              container: (provided) => ({
                  ...provided,
              }),

          }, 
          
          }}
          // biases autocomplete search results to locations near IP address
          ipbias
        />

        
<div class="btn-toolbar justify-content-between">
        {/* Button to change to Map View or List View */}
        <Button onClick={(e) => toggleView(e)} variant="contained" sx={{mb: 1, mt: 1, borderRadius: 5, flexGrow: 0}}
            >
        {mapView ? "List view" : "Map view"}
        </Button>
        <Button variant="contained" onClick={(e) => sendLocation(e)} sx={{mb: 1, mt: 1,backgroundColor: 'white', border: '1px solid lightgrey', borderRadius: 5}}>
          🔎
        </Button>
</div>

      {/* "Filter by" toggle switch (choose filters in popup modal) */}
      {/* <FilterByModal
        // show={modalShow}
        onHide={() => setModalShow(false)}
        // setShow={setShow}
        handleClose={handleClose}
        modalShow={modalShow}
        setModalShow={setModalShow}
      /> */}

      {/* if "List View" is selected, renders a list of bathrooms */}

      {mapView === false ? (
// While you are in "List View" mode:
        // if you have searched for bathrooms by proximity to your location, renders a list of those bathrooms by distance
        bathroomsByDistance && bathroomsByDistance.length > 0 ? (
          <Box className="table-div" sx={{ height: '70vh'}}>

                {bathrooms && bathroomsByDistance.map((bathroom) => (
                  <BathroomItem key={bathroom.id} bathroom={bathroom} origin={origin}
                  />
                ))}

          </Box>
        ) : (
          

          // otherwise, if you haven't entered a search query, renders a list of *all* bathrooms (default upon page load)
          <Box className="table-div" sx={{ height: '70vh'}}>

                {bathrooms?.map((bathroom) => (
                  <BathroomItem key={bathroom.id} bathroom={bathroom} origin={currentLat !== 0 ? `${currentLat},${currentLng}` : '44.97997, -93.26384'}/>
                ))}
          </Box>
        )
      ) : 
      // otherwise if you are in "Map View" mode:
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
        mapContainerStyle={{ width: '100%', height: '70vh' }}
        center={center}
        zoom={14}
      >
      <MarkerF 
      position={({lat: currentLat, lng: currentLng})}
      icon={blueDot}/>
     {bathrooms?.map((bathroom, i) => {
    return (
   
        <Marker key={i} bathroom={bathroom} MarkerF={MarkerF} InfoWindowF={InfoWindowF}/>
  
    )
})}
      </GoogleMap>

             // if "Map View" is selected, renders a map
        // <MyMap  selectedLocation={selectedLocation} />
    //  ''
     )
     )}
    </Box>
  )
}

export default BathroomsPage;
