import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import BathroomItem from "../BathroomItem/BathroomItem";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
// need to require dot env if we use it I believe
import Map from "../Map/Map";
import { Button } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardMedia,
} from "@mui/material";
import Table from "react-bootstrap/Table";
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
    console.log("singleStall:", singleStall);
  };

  const requireChangingTable = () => {
    setChangingTable(!changingTable);
    console.log("changingTable:", changingTable);
  };

  const requireAccessible = () => {
    setAccessible(!accessible);
    console.log("accessible:", accessible);
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
      <Button variant="dark" onClick={handleShow}>
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
  const [listView, setListView] = useState(true);
  const myApiKey = process.env.GOOGLE_MAPS_API_KEY;
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch({
      type: "SAGA/FETCH_BATHROOMS",
    });
  }, []);

  const sendLocation = (e) => {
    e.preventDefault();
    if (value !== "") {
      // converts address to url-friendly string
      const convertedAddress = value.value.description.split(" ").join("%20");
      console.log("convertedAddress:", convertedAddress);
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
    setListView(!listView);
    console.log("listView:", listView);
  };

  // const getBathrooms = () => {
  //   console.log("This is a test. getBathrooms is running");
  //   dispatch({
  //     type: "SAGA/FETCH_BATHROOMS",
  //   });
  // };

  return (
    <div className="container">
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
          label={listView ? "Map view" : "List view"}
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
      {listView === true ? (

        // if you have searched for bathrooms by proximity to your location, renders a list of those bathrooms by distance
        bathroomsByDistance.length > 0 ? (
          <div className="table-div">
            {/* <Table responsive="sm"> */}
              {/* <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Street</th>
                  <th>City</th>
                  <th>Distance</th>
                </tr>
              </thead> */}
              {/* <tbody> */}
                {bathroomsByDistance.map((bathroom) => (
                  <BathroomItem key={bathroom.id} bathroom={bathroom} 
                  />
                ))}
         {/* </tbody>
             </Table> */}
          </div>
        ) : (
          

          // otherwise, if you haven't entered a search query, renders a list of *all* bathrooms (default upon page load)
          <div className="table-div">
            {/* <Table responsive="sm"> */}
              {/* <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Street</th>
                  <th>City</th>
                  <th></th>
                </tr>
              </thead> */}
              {/* <tbody> */}
                {bathrooms.map((bathroom) => (
                  <BathroomItem key={bathroom.id} bathroom={bathroom} />
                ))}
              {/* </tbody>
            </Table> */}
          </div>
        )
      ) : (
             // if "Map View" is selected, renders a map
        <Map />
      )}

    </div>
  );
}

export default BathroomsPage;