import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box } from "@mui/material";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ApiBathroomItem from "../ApiBathroomItem/ApiBathroomItem";
import { DotLoader } from "react-spinners";

function AddBathrooms() {
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  let apiBathrooms = useSelector((store) => store.apiBathrooms);
  const [isLoading, setIsLoading] = useState(false);

  // array of bathrooms to add
  const bathroomArray = useSelector((store) => store.apiBathrooms);

  // sets 'per_page' value for http API query
  const bathroomsPerPage = (e) => {
    setPerPage(e.target.value);
  };

  // sets 'page' (page number) value for http API query
  const pageNumberFunction = (e) => {
    setPageNumber(e.target.value);
  };

  const sendBathrooms = () => {
    console.log("bathroomArray:", bathroomArray);
    dispatch({
      type: "SAGA/ADD_BATHROOMS_TO_DB",
      payload: bathroomArray,
    });
  };

  // submits http GET request to Refuge Restrooms API with given search parameters
  const loadBathrooms = () => {
    console.log("payload:", { perPage, pageNumber });
    setIsLoading(true);
    dispatch({
      type: "SAGA/LOAD_BATHROOMS_FROM_API",
      payload: { perPage, pageNumber, setIsLoading },
    });
  };
  return (
    <Form onSubmit={loadBathrooms} sx={{mt: 10}}>
      <Box sx={{mt: 10}}>
      {isLoading && <DotLoader />}
      <h3>Load bathrooms from Refuge API</h3>
      <input
        placeholder="Bathrooms per page"
        onChange={(e) => bathroomsPerPage(e)}
      ></input>
      <input
        placeholder="Page number"
        onChange={(e) => pageNumberFunction(e)}
      ></input>
      <Button 
      type="submit" 
      variant="contained"
      sx={{
        mr: 2,
        ml: 2
      }}>
        Load bathrooms
      </Button>
      <Button type="secondary" variant="contained" onClick={sendBathrooms}>
        Add all to database
      </Button>
      <Table striped="columns" responsive="xl" bordered hover>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Bathroom ID</th>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th id="directions">Directions__________________</th>
            <th>Comments___________</th>
            <th>Upvotes</th>
            <th>Downvotes</th>
            <th>Gender neutral</th>
            <th>Wheelchair accessible</th>
            <th>Changing table</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {apiBathrooms.map((bathroom) => (
            <ApiBathroomItem
              key={bathroom.id}
              bathroom={bathroom}
              bathroomArray={bathroomArray}
            />
          ))}
        </tbody>
      </Table>
      </Box>
    </Form>
  );
}

export default AddBathrooms;
