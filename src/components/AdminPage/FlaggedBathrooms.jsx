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

  const dispatch = useDispatch()

  const flaggedBathrooms = useSelector(store => store.flaggedBathrooms);

  useEffect(() => {
    dispatch({ type: 'SAGA/FETCH_FLAGGED_BATHROOMS' })
  }, [])

  const [reviewModalOpen, setReviewModalOpen] = useState(false)

  const handleReview = () => {

  }

  return (
    <>
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
          {flaggedBathrooms.map((bathroom) => (
            <>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'green' }}>Suggested changes:</TableCell>
                <TableCell sx={{ color: 'green' }}>{bathroom.name}</TableCell>
                <TableCell>{bathroom.street}</TableCell>
                <TableCell>{`${bathroom.city}, ${bathroom.state}`}</TableCell>
                <TableCell sx={{ color: 'green' }}>
                  {bathroom.accessible && <AccessibleForwardOutlined />}
                  {bathroom.single_stall && <Man4 />}
                  {bathroom.unisex && <TransgenderOutlined />}
                </TableCell>
                <TableCell>
                  <Button
                    color="info" 
                    variant="contained" 
                    size="small"
                    onClick={() => handleReview}
                  > Review suggested edits
                  </Button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </Box>
    </>
  );
}

export default FlaggedBathrooms;
