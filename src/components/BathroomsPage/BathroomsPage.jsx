import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
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
  const openNow = useSelector((store) => store.openNow);
  // const [openNow, setOpenNow] = useState(false)
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
          <Button variant="success" onClick={submitFilters}>
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

  useEffect(() => {
        // gets user's current location and sets coordinates in React state for directions
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLat(position.coords.latitude)
            setCurrentLng(position.coords.longitude)
          });
    (dispatch({
      type: 'SAGA/FETCH_BATHROOMS',
      // payload: {
      //   lat: currentLat,
      //   lng: currentLng
      // }
    }))
  }, []);

  // sends address types into Autocomplete box to server to get bathrooms list
  const sendLocation = (e) => {
    e.preventDefault();
    if (value !== "") {
      // converts address to url-friendly string
      const convertedAddress = value.value.description.split(" ").join("%20");
      console.log("convertedAddress:", convertedAddress);
      setOrigin(convertedAddress)
      dispatch({
        type: "SAGA/SEND_LOCATION",
        payload: convertedAddress,
      });
      console.log("addressCoordinates:", addressCoordinates);
      // 👇 clears the input field after we make a search
      // setValue('')
    } else {
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
      <form onSubmit={(e) => sendLocation(e)}>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE"
          // onChange={(e) => setAddressInput(e.target.value)}
          // value={addressInput}
          selectProps={{
            value,
            onChange: setValue,
          }}
        />
        <button type="submit" onClick={(e) => sendLocation(e)}>
          Search nearby
        </button>
        {/* <button onClick={getBathrooms}>See all bathrooms</button> */}
      </form>

      {/* toggle switch for Map View/List View */}
      <Form>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label={mapView ? "Map view" : "List view" }
          checked={isChecked}
          onClick={(e) => toggleView(e)}
        />
      </Form>

      {/* "Filter by" toggle switch (choose filters in popup modal) */}
      <FilterByModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setShow={setShow}
        handleClose={handleClose}
        modalShow={modalShow}
        setModalShow={setModalShow}
      />

      {/* if "List View" is selected, renders a list of bathrooms */}
      {mapView === true ? (

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
                  <BathroomItem key={bathroom.id} bathroom={bathroom} origin={currentLat ? `${currentLat},${currentLng}` : '44.97997, -93.26384'}/>
                ))}
          </div>
        )
      ) : (
             // if "Map View" is selected, renders a map
        <MyMap />
    //  ''
     )}

    </Box>
  );
}

export default BathroomsPage;
