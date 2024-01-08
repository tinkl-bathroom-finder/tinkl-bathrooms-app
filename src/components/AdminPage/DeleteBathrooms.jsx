import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import DeleteBathroomItem from "../BathroomItem/DeleteBathroomItem";

function DeleteBathrooms() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const bathrooms = useSelector((store) => store.bathrooms);
  const getAllBathrooms = () => {
    dispatch({
      type: "SAGA/FETCH_BATHROOMS",
    });
  };

  return (
    <>
    <input placeholder="Enter name, id" label="Filter by:"></input>
      <Button onClick={getAllBathrooms}>Load all bathrooms</Button>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {bathrooms.map((bathroom) => (
            <DeleteBathroomItem key={bathroom.id} bathroom={bathroom} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DeleteBathrooms;
