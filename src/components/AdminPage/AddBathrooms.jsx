import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ApiBathroomItem from "../ApiBathroomItem/ApiBathroomItem";

function AddBathrooms() {
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  let apiBathrooms = useSelector((store) => store.apiBathrooms);

  // sets 'per_page' value for http API query
  const bathroomsPerPage = (e) => {
    setPerPage(e.target.value);
  };

  // sets 'page' (page number) value for http API query
  const pageNumberFunction = (e) => {
    setPageNumber(e.target.value);
  };

  // submits http GET request to Refuge Restrooms API with given search parameters
  const loadBathrooms = () => {
    console.log("payload:", { perPage, pageNumber });
    dispatch({
      type: "SAGA/LOAD_BATHROOMS_FROM_API",
      payload: { perPage, pageNumber },
    });
  };
  return (
  <Form onSubmit={loadBathrooms}>
    <h3>Load bathrooms from Refuge API</h3>
    <input
      placeholder="Bathrooms per page"
      onChange={(e) => bathroomsPerPage(e)}
    ></input>
    <input
      placeholder="Page number"
      onChange={(e) => pageNumberFunction(e)}
    ></input>
    <Button type="submit">Submit</Button>
    <Table striped="columns" responsive="xl" bordered hover>
      <thead>
        <tr>
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
          <ApiBathroomItem key={bathroom.id} bathroom={bathroom} />
        ))}
      </tbody>
    </Table>
  </Form>
)}

export default AddBathrooms;
