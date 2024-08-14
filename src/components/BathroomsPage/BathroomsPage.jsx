import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import Marker from "../Marker/Marker";
import FilterByToggles from "./FilterByToggles";

import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
// import { Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import BathroomItemList from "../BathroomItem/BathroomItemList";
import BathroomItemMap from "../BathroomItem/BathroomItemMap";
// require('dotenv').config();

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

  const bathrooms = useSelector((store) => store.bathrooms);
  const bathroomsByDistance = useSelector((store) => store.bathroomsByDistance);
  const mapView = useSelector((store) => store.mapView);

  const filter_bathrooms = bathrooms.filter(function(bathroom) {
    return bathroom.isOpenNow === true; 
  })

  // captures value of address typed in search bar as local state
  const [searchBarAddress, setSearchBarAddress] = useState("");

  // state to open or close FilterByModal
  const [modalShow, setModalShow] = useState(false);

  const [show, setShow] = useState(false);

  // state for "filter by" toggles (open now, wheelchair accessible, single-stall, changing table)
  const [isChecked, setIsChecked] = useState(false);
  const handleClose = () => setShow(false);

  // origin is the searched address from the search bar, converted into url-friendly string
  const [origin, setOrigin] = useState("");
  const [currentLat, setCurrentLat] = useState(44.979225);
  const [currentLng, setCurrentLng] = useState(-93.266945);

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const mapRef = useRef();

  useEffect(() => {
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

    // fetches the big list of bathrooms
    dispatch({
      type: "SAGA/FETCH_BATHROOMS",
    });

    getDateTime();

  }, []);

  const getDateTime = () => {
    const date = new Date();
    let day = date.getDay(); // day comes back as number => 1 is Monday, 2 is Tuesday, etc.
    let hour = date.getHours() * 100; // formats hour as military time
    let minutes  = date.getMinutes();
    let militaryTime = hour + minutes // we don't actually need to convert this to a string since we want to compare it as a numeral

    console.log(`Time string: ${day} at ${militaryTime}` )

    return (day, militaryTime)
  }



  // sends address types into Autocomplete box to server to get bathrooms list
  const sendLocation = () => {
    // Ensures that sendLocation isn't triggered when search box is cleared
    if (searchBarAddress === null) {
      return;
    }
    // biome-ignore lint/style/noUselessElse: <explanation>
    else if (searchBarAddress !== "") {
      console.log("searchBarAddress: ", searchBarAddress);
      // converts address to url-friendly string
      const convertedAddress = searchBarAddress.value.description
        .split(" ")
        .join("%20");
      // try {
      //   console.log('Converted Address', convertedAddress)
      setOrigin(convertedAddress);
      dispatch({
        type: "SAGA/SEND_LOCATION",
        payload: convertedAddress,
      });
      // } catch (err) {
      //   console.log("Error sending location: ", err);
      // }
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
      type: "TOGGLE_VIEW",
    });
  };

  // Ensures searchBarAddress is set in state before executing sendLocation()
  useEffect(() => {
    //if (searchBarAddress !== '') {
    menuClosed();
  }, [searchBarAddress]);

  // Runs when search menu is closed, allowing whatever has been selected to be sent to sendLocation()
  const menuClosed = () => {
    if (searchBarAddress === "") {
      console.log("Search bar is empty");
    } else {
      sendLocation();
    }
  };
  // Runs when search menu is opened, emptying the menu of text
  const menuOpened = () => {
    if (searchBarAddress !== "") {
      setSearchBarAddress("");
    }
  };

  const handleChange = (address) => {
    setSearchBarAddress(address);
  }

  return (
    <Box className="container" sx={{ mt: 6, width: 9 / 10, p: 0 }}>
      <div class="btn-toolbar justify-content-between">
        {/* AutoComplete search box */}
        <GooglePlacesAutocomplete
          selectProps={{
            className: "searchBar", // Provides the component with a class for styling
            isClearable: true, // Allows the textbox to be emptied with X
            onBlur: () => menuClosed(), // Triggers menuClosed() when clicking off of the textbox
            onMenuOpen: () => menuOpened(), // Triggers textbox to clear when clicking on it
            value: searchBarAddress,
            onChange: handleChange,
            placeholder: "Enter an address", // Sets the placeholder for textbox
            styles: {
              input: (provided) => ({
                ...provided,
                // text color in searchbar
                color: "black",
              }),
              // Removes highlight on hover
              option: (provided) => ({
                ...provided,
                // text color for dropdown menu items
                color: "black",
                // background color for dropdown menu items (set to black but it is modified by menu styling below to make it transparent)
                background: "#00000000",
              }),
              // 👇 I don't know what this does TBH. -ES 4.24.24
              singleValue: (provided) => ({
                ...provided,
                // color: "blue",
                // background:"black"
              }),
              // this is the searchbar itself
              control: (provided) => ({
                ...provided,
                width: "100%",
                // background: 'rgba(255, 255, 255, 0.25)',
                border: "1px solid rgba(255, 255, 255, 0.41)",
                backdropFilter: "blur(50px)",
                borderRadius: "20px",
              }),
              // styling for dropdown menu
              menu: (provided) => ({
                ...provided,
                width: "100%",
                // transparent rainbow gradient 🤓
                background:
                  "linear-gradient(0deg, rgba(236,212,255,0.25) 0%, rgba(214,200,251,0.25) 14%, rgba(194,214,247,0.25) 23%, rgba(201,241,225,0.25) 35%, rgba(209,244,191,0.25) 48%, rgba(246,237,171,0.25) 60%, rgba(255,230,175,0.25) 73%, rgba(255,208,166,0.25) 87%, rgba(255,166,166,0.25004595588235294) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.41)",
                backdropFilter: "blur(50px)",
                borderRadius: "12px",
              }),
              container: (provided) => ({
                ...provided,
              }),
            },
          }}
          // 👇 biases autocomplete search results to locations near IP address
          // ipbias
        />

        {/* Button to change to Map View or List View */}
        <Button
          onClick={(e) => toggleView(e)}
          variant="contained"
          sx={{ mb: 1, mt: 1, borderRadius: 5, flexGrow: 0 }}
        >
          {mapView ? "List view" : "Map view"}
        </Button>

<FilterByToggles />

        {/* "Filter by" toggle switch (choose filters in popup modal) */}
        {/* <FilterByModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setShow={setShow}
        handleClose={handleClose}
        modalShow={modalShow}
        setModalShow={setModalShow}
      /> */}
      </div>

      {/* if "List View" is selected, renders a list of bathrooms */}

      {mapView === false ? (
        // While you are in "List View" mode:

        // if you have searched for bathrooms by proximity to your location, renders a list of those bathrooms by distance
        bathroomsByDistance && bathroomsByDistance.length > 0 ? (
          <Box className="table-div" sx={{ height: "70vh" }}>
            {bathrooms &&
              bathroomsByDistance.map((bathroom) => (
                <BathroomItemList
                  key={bathroom.id}
                  bathroom={bathroom}
                  origin={origin}
                />
              ))}
          </Box>
        ) : (
          // otherwise, if you haven't entered a search query, renders a list of *all* bathrooms (default upon page load)
          <Box className="table-div" sx={{ height: "70vh" }}>
            {bathrooms?.map((bathroom) => (
              <BathroomItemList
                key={bathroom.id}
                bathroom={bathroom}
                origin={
                  currentLat !== 0
                    ? `${currentLat},${currentLng}`
                    : "44.97997, -93.26384"
                }
              />
            ))}
          </Box>
        )
      ) : (
        // otherwise if you are in "Map View" mode, shows a map:
        <MyMap />
      )}
    </Box>
  );
}

export default BathroomsPage;
