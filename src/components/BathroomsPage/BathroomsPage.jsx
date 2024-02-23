import React, { useMemo, useRef, useCallback, useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import Marker from "../Marker/Marker";

import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
// import { Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import BathroomItem from "../BathroomItem/BathroomItem";
// const dotenv = require('dotenv').config();

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
// need to require dot env if we use it I believe
import MyMap from "../Map/Map";
import { Button } from "@mui/material";
import {
  Box
} from "@mui/material";
// import FilterByModal from "./FilterByModal";

function FilterByModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const openNow = useSelector((store) => store.openNow);
  const [openNow, setOpenNow] = useState(false)
  const [singleStall, setSingleStall] = useState(false);
  const [changingTable, setChangingTable] = useState(false);
  const [accessible, setAccessible] = useState(false);

  const filterObject = {
    is_open: openNow,
    is_single_stall: singleStall,
    changing_table: changingTable,
    accessible: accessible,
  };

  const requireOpen = () => {
    setOpenNow(!openNow);
    console.log("openNow:", openNow);
  };

  const requireSingleStall = () => {
    setSingleStall(!singleStall);
    console.log("singleStall required:", singleStall);
  };

  const requireChangingTable = () => {
    setChangingTable(!changingTable);
    console.log("changingTable required:", changingTable);
  };

  const requireAccessible = () => {
    setAccessible(!accessible);
    console.log("accessible required:", accessible);
  };

  const submitFilters = () => {
    console.log("filterObject:", filterObject);
    dispatch({
      type: "SAGA/SET_FILTERS",
      payload: filterObject,
    });
  };
  return (
    <>
      <Button variant="outlined" onClick={handleShow}>
        Filter by
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter by:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* filter by "open now" */}
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="open now"
              onClick={requireOpen}
            />
            {/* filter by "single stall" */}
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="single-stall"
              onClick={requireSingleStall}
            />
            {/* filter by "changing table" */}
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="changing table"
              onClick={requireChangingTable}
            />
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="wheelchair accessible"
              onClick={requireAccessible}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function BathroomsPage() {
  const dispatch = useDispatch();

  const store = useSelector((store) => store);
  const bathrooms = useSelector((store) => store.bathrooms);
  const bathroomsByDistance = useSelector((store) => store.bathroomsByDistance);
  const addressCoordinates = useSelector((store) => store.addressCoordinates);

  // captures value of address typed in search bar as local state
  const [value, setValue] = useState("");
  const mapView = useSelector((store) => store.mapView);
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleClose = () => setShow(false);
  const [origin, setOrigin] = useState('')
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);

  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 });
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const mapRef = useRef();
  // const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

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
      width: '80vw',
      height: '70vh',
      leftMargin: '20px',
      rightMargin: '20px'
  }

     // useMemo performs the calculation once everytime the array arg changes, reuses the same value every time it re-renders
     const center = useMemo(() => ({lat: currentLat, lng: currentLng }), [currentLat, currentLng] );

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
  const sendLocation = async (e) => {
    e.preventDefault();
    if (value !== "") {
      // converts address to url-friendly string 
      const convertedAddress = value.value.description.split(" ").join("%20");
        console.log("convertedAddress:", convertedAddress);
        // 🔥🔥🔥🔥🔥🔥 NEED TO FIGURE OUT THIS ASYNC/AWAIT THING! It is indeed recentering the map correctly if you click "search nearby" twice - so the setCurrentLat and setCurrentLng are working, they just aren't happening asynchronously - we need to wait until we get the addressCoordinates back from the address saga to plug them in
    try { 
      await setOrigin(convertedAddress)
      await dispatch({
        type: "SAGA/SEND_LOCATION",
        payload: convertedAddress,
      });
      await setCurrentLat(addressCoordinates.lat);
      await setCurrentLng(addressCoordinates.lng);
      console.log("addressCoordinates:", addressCoordinates);
      // 👇 clears the input field after we make a search
     } catch (err) {
      console.log('Error sending location: ', err)
     }

    } else {
      // (dispatch({
      //   type: 'SAGA/FETCH_BATHROOMS',
      //   payload: {
      //       lat: currentLat,
      //       lng: currentLng
      //   }
      // }))
      Swal.fire({
        title: "Trying to search by location?",
        text: "Start typing an address to begin!",
        icon: "question",
      });
    }
  };

  // function to toggle between map and list view
  const toggleView = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    dispatch({
      type: 'TOGGLE_VIEW',
    });
  };

  const clearInput = () => {
    setValue('')
  }

  // const apiKey=process.env.GOOGLE_MAPS_API_KEY

  return (
    <Box className="container" sx={{mt: 6, width: 9/10}}>
      {/* AutoComplete search box */}
      <div>
      <Form onSubmit={(e) => sendLocation(e)}>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE"
          // onChange={(e) => setAddressInput(e.target.value)}
          // value={addressInput}
          selectProps={{
            value,
            onChange: setValue
          }}
          // biases autocomplete search results to locations near IP address
          ipbias
        />
        <Button variant="outlined" onClick={(e) => sendLocation(e)} sx={{mb: 1, mt: 1, mr: 1}}>
          Search nearby
        </Button>
        {/* <button onClick={getBathrooms}>See all bathrooms</button> */}
            <Button onClick={(e) => toggleView(e)} variant="contained" sx={{mb: 1, mt: 1}}
            >
        {mapView ? "Map view" : "List view" }
        </Button>
        </Form>
      </div>

      {/* "Filter by" toggle switch (choose filters in popup modal) */}
      {/* <FilterByModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setShow={setShow}
        handleClose={handleClose}
        modalShow={modalShow}
        setModalShow={setModalShow}
      /> */}

      {/* toggle switch for Map View/List View */}

      {/* <Form>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label={mapView ? "Map view" : "List view" }
          checked={isChecked}
          onClick={(e) => toggleView(e)}
        />
      </Form> */}



      {/* if "List View" is selected, renders a list of bathrooms */}
      {mapView === true ? (
// While you are in "List View" mode:
        // if you have searched for bathrooms by proximity to your location, renders a list of those bathrooms by distance
        bathroomsByDistance && bathroomsByDistance.length > 0 ? (
          <div className="table-div">

                {bathrooms && bathroomsByDistance.map((bathroom) => (
                  <BathroomItem key={bathroom.id} bathroom={bathroom} origin={origin}
                  />
                ))}

          </div>
        ) : (
          

          // otherwise, if you haven't entered a search query, renders a list of *all* bathrooms (default upon page load)
          <div className="table-div">

                {bathrooms && bathrooms.map((bathroom) => (
                  <BathroomItem key={bathroom.id} bathroom={bathroom} origin={currentLat !== 0 ? `${currentLat},${currentLng}` : '44.97997, -93.26384'}/>
                ))}
          </div>
        )
      ) : 
      // otherwise if you are in "Map View" mode:
      (
        // if you have searched for bathrooms by proximity to your location, recenters the map on your location and shows markers close by you
        bathroomsByDistance && bathroomsByDistance.length > 0 ? (
          <GoogleMap
          zoom={15}
          center={center}
          mapContainerStyle={containerStyle}
          options={options}
          onLoad={onLoad}
      >
        {/* 👇 shows a marker for your queried address. But seems to then not show bathroom markers? */}
        {/* <MarkerF position={center} label="You are here"/> */}
{bathrooms && bathroomsByDistance.map((bathroom, i) => {
    return (
   
        <Marker key={i} bathroom={bathroom} MarkerF={MarkerF} InfoWindowF={InfoWindowF}/>
  
    )
})}
      </GoogleMap>
        ) : (
        // otherwise, if you haven't entered a search query, renders a list of *all* bathrooms (default upon page load) with map centered on your current location or default Minneapolis location
        <GoogleMap
        mapContainerStyle={{ width: '100%', height: '70vh' }}
        center={center}
        zoom={14}
      >
     {bathrooms && bathrooms.map((bathroom, i) => {
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
