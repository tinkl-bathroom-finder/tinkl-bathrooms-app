import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Table, TableContainer, TableHead, TableBody, TableCell, TableRow  } from "@mui/material";
import Form from "react-bootstrap/Form";
import DeleteBathroomItem from "../BathroomItem/DeleteBathroomItem";
import {
  AccessibleForwardOutlined,
  BabyChangingStationOutlined,
  ExpandMore,
  Man4,
  Place,
  TransgenderOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";

function ApproveBathrooms() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const bathrooms = useSelector((store) => store.bathrooms);
  const getAllBathrooms = () => {
    dispatch({
      type: "SAGA/FETCH_BATHROOMS",
    });
  };

  return (
    <Box>
    <Table>
      <TableHead>
        <TableRow>
          <th>Added by</th>
          <th>Date added</th>
          <th>Bathroom name</th>
          <th>Street</th>
          <th>City</th>
          <th>Amenities</th>
          <th>Approve as is</th>
          <th>Edit info</th>
        </TableRow>
      </TableHead>
      <TableBody>
    <TableRow>
      <TableCell>wickedpissah</TableCell>
      <TableCell>October 6, 2024</TableCell>
      <TableCell>Prime Digital Academy</TableCell>
      <TableCell>401 S 4th Ave</TableCell>
      <TableCell>Minneapolis</TableCell>
      <TableCell>
        <AccessibleForwardOutlined/>
        <TransgenderOutlined/>
      </TableCell>
      <TableCell>
        <Button color="info" variant="contained" size="small">Approve as is</Button>
        </TableCell>
        <TableCell>
          <Button color="error" variant="contained" size="small">Edit info</Button>
        </TableCell>
      </TableRow>
      </TableBody>
    </Table>
  </Box>
  );
}

export default ApproveBathrooms;
