import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Table, TableContainer, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
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

function FlaggedBathrooms() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const bathrooms = useSelector((store) => store.bathrooms);

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <th></th>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th>Amenities</th>
            <th></th>
          </TableRow>
        </TableHead>
        <TableBody>
      <TableRow>
        <TableCell sx={{fontWeight: 'bold'}}>Current info:</TableCell>
        <TableCell>Blue Moon Coffee Cafe</TableCell>
        <TableCell>3822 Lake St</TableCell>
        <TableCell>Minneapolis</TableCell>
        <TableCell>
        </TableCell>
        <TableCell>
          {/* <Button color="info" variant="contained" size="small">Review suggested edits</Button> */}
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell sx={{fontWeight: 'bold', color: 'green'}}>Suggested changes:</TableCell>
        <TableCell sx={{color: 'green'}}>Milkweed</TableCell>
        <TableCell>3822 Lake St</TableCell>
        <TableCell>Minneapolis</TableCell>
        <TableCell sx={{color: 'green'}}>
          <AccessibleForwardOutlined/>
          <Man4/>
          <TransgenderOutlined/>
        </TableCell>
        <TableCell>
          <Button color="info" variant="contained" size="small">Review suggested edits</Button>
          </TableCell>
        </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

export default FlaggedBathrooms;
