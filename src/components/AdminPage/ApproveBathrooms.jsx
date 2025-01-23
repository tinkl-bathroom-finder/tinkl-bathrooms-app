import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton, Table, TableContainer, TableHead, TableBody, TableCell, TableRow  } from "@mui/material";
import {
  AccessibleForwardOutlined,
  BabyChangingStationOutlined,
  CheckCircle,
  Delete,
  ExpandMore,
  Edit,
  Man4,
  Place,
  TransgenderOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";

function ApproveBathrooms() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const bathroomsToApprove = useSelector((store) => store.bathroomsToApprove);

  // formats inserted_at timestamp as readable string
  const stringifyDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const stringifiedDate = date.toLocaleDateString("en-us", options);
    return stringifiedDate;
  };

  useEffect(() => {
    dispatch({
      type: "SAGA/GET_BATHROOMS_TO_APPROVE",
    });
  }, []);

  const deleteBathroomFromDatabase = (bathroom) => {
    console.log("bathroom.id", bathroom.id);
    // popup to confirm you are sure you want to delete
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      imageUrl: "https://media.giphy.com/media/LdgRBEyuJ6JNHsFEwF/giphy.gif",
      imageWidth: 250,
      imageHeight: 250,
      imageAlt: "Pink poop",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, flush it!"
    }).then((result) => {
      if (result.isConfirmed) {
    dispatch({
      type: "SAGA/DELETE_BATHROOM",
      payload: bathroom.id
    })
  }})
  };

  return (
    <Box sx={{backgroundColor: "#ffe6e8", m: 3, borderRadius: "8px"}}>
    <Table sx={{textAlign: 'center'}}>
      <TableHead>
        <TableRow>
          <TableCell>Added by</TableCell>
          <TableCell>Date added</TableCell>
          <TableCell>Bathroom name</TableCell>
          <TableCell>Street</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Amenities</TableCell>
          <TableCell>Delete</TableCell>
          <TableCell>Edit</TableCell>
          <TableCell>Approve</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {/* <TableRow>
          <TableCell>{bathroomsToApprove[0]?.name}</TableCell>
        </TableRow> */}
        {bathroomsToApprove?.map((item) => (
      <TableRow>
          <TableCell>{item.username}</TableCell>
          <TableCell>{`${stringifyDate(item.created_at)}`}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.street}</TableCell>
          <TableCell>{item.city}</TableCell>
          <TableCell>
            {item.accessible ? <AccessibleForwardOutlined/> : ''}
            <TransgenderOutlined/>
          </TableCell>
          <TableCell>
            <Button color="error" variant="contained" size="small" sx={ { borderRadius: 28 } } onClick={() => deleteBathroomFromDatabase(item)}>
              <Delete/>
              </Button>
          </TableCell>
            <TableCell>
              <Button color="primary" variant="contained" size="small" sx={ { borderRadius: 28 } }>
                <Edit/>
              </Button>
            </TableCell>
          <TableCell>
            <Button color="success" variant="contained" size="small" sx={ { borderRadius: 28, color: 'white' } }>
              <CheckCircle/>
            </Button>
            </TableCell>
      </TableRow>
 ))} 

      </TableBody>
    </Table>
  </Box>
  );
}

export default ApproveBathrooms;
