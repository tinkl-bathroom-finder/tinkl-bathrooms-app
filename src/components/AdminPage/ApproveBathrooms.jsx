import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Table, TableContainer, TableHead, TableBody, TableCell, TableRow  } from "@mui/material";
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

  return (
    <Box>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Added by</TableCell>
          <TableCell>Date added</TableCell>
          <TableCell>Bathroom name</TableCell>
          <TableCell>Street</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Amenities</TableCell>
          <TableCell>Approve as is</TableCell>
          <TableCell>Edit info</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {/* <TableRow>
          <TableCell>{bathroomsToApprove[0]?.name}</TableCell>
        </TableRow> */}
        {bathroomsToApprove?.map((item) => (
      <TableRow>
          <TableCell>{item.added_by_user}</TableCell>
          <TableCell>{`${stringifyDate(item.created_at)}`}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.street}</TableCell>
          <TableCell>{item.city}</TableCell>
          <TableCell>
            {item.accessible ? <AccessibleForwardOutlined/> : ''}
            <TransgenderOutlined/>
          </TableCell>
          <TableCell>
            <Button color="info" variant="contained" size="small">Approve as is</Button>
            </TableCell>
            <TableCell>
              <Button color="error" variant="contained" size="small">Edit info</Button>
            </TableCell>
      </TableRow>
 ))} 

      </TableBody>
    </Table>
  </Box>
  );
}

export default ApproveBathrooms;
