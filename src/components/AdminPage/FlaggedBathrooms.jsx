import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, FormControl, Input, InputLabel, Modal, Paper, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Typography } from "@mui/material";
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
  console.log("flaggedBathrooms: ", flaggedBathrooms)

  useEffect(() => {
    dispatch({ type: 'SAGA/FETCH_FLAGGED_BATHROOMS' })
  }, [])

  const [reviewModalOpen, setReviewModalOpen] = useState(false)

  const handleReview = (bathroom) => {
    setReviewModalOpen(true);
  }

  const handleClose = () => setReviewModalOpen(false);

    // formats inserted_at timestamp as readable string
  const stringifyDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const stringifiedDate = date.toLocaleDateString("en-us", options);
    return stringifiedDate;
  };

  function ReviewBathroomModal (props) {
    console.log("props: ", props)
    const bathroom = props.bathroom

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};
    return (
      <Modal
        open={props.open}
        onClose={props.handleClose}
        >
          <Box sx={style}>
            <h2>{bathroom.original_name}</h2>
            <br/>
            <Typography textAlign="center" fontWeight="bold">Proposed Changes</Typography>
            <Table sx={{mb: 5}}>
              <TableHead>
              </TableHead>
                <TableRow sx={{ 
                  backgroundColor: `${bathroom.original_name === bathroom.proposed_name ? "" : "#feeb72"}`}}>
                  <TableCell>
                    Bathroom name
                  </TableCell>
                  <TableCell>{bathroom.proposed_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Address
                  </TableCell>
                  <TableCell>{bathroom.proposed_street}, {bathroom.proposed_city} {bathroom.proposed_state}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Amenities
                  </TableCell>
                  <TableCell>           
                    
                                {bathroom.proposed_unisex ? (
                                    <TransgenderOutlined sx={{ display: "inline" }} />
                                ) : (
                                  ""
                                )}
                                {/* has changing table */}
                                {bathroom.proposed_changing_table ? (

                                    <BabyChangingStationOutlined sx={{ display: "inline" }} />

                                ) : (
                                  ""
                                )}
                  
                                {/* is wheelchair accessible */}
                                {bathroom.proposed_accessible ? (

                                    <AccessibleForwardOutlined sx={{ display: "inline" }} />
                                ) : (
                                  ""
                                )}
                  
                                {/* is single-stall */}
                                {bathroom.proposed_is_single_stall ? (

                                    <Man4 sx={{ display: "inline" }} />
                                ) : (
                                  ""
                                )}
                              </TableCell>
                </TableRow> 
                    {bathroom.proposed_is_permanently_closed ? 
                <TableRow sx={{backgroundColor: "#feeb72"}}>
                  <TableCell sx={{color: "red", fontWeight: "bold"}}>Permanently closed</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                : ""}
            </Table>

            <Typography textAlign="center" fontWeight="bold" color="grey">Original</Typography>
            <Table sx={{mb: 5}}>
              <TableHead>
              </TableHead>
                <TableRow>
                  <TableCell>
                    Bathroom name
                  </TableCell>
                  <TableCell>{bathroom.original_name}</TableCell>
                </TableRow>
<TableRow>
                  <TableCell>
                    Address
                  </TableCell>
                  <TableCell>{bathroom.original_street}, {bathroom.original_city} {bathroom.original_state}</TableCell>
                </TableRow><TableRow>
                  <TableCell>
                    Amenities
                  </TableCell>
                  <TableCell>                                {bathroom.proposed_unisex ? (
                                    <TransgenderOutlined sx={{ display: "inline" }} />
                                ) : (
                                  ""
                                )}
                                {/* has changing table */}
                                {bathroom.original_changing_table ? (

                                    <BabyChangingStationOutlined sx={{ display: "inline" }} />

                                ) : (
                                  ""
                                )}
                  
                                {/* is wheelchair accessible */}
                                {bathroom.original_accessible ? (

                                    <AccessibleForwardOutlined sx={{ display: "inline" }} />
                                ) : (
                                  ""
                                )}
                  
                                {/* is single-stall */}
                                {bathroom.original_is_single_stall ? (

                                    <Man4 sx={{ display: "inline" }} />
                                ) : (
                                  ""
                                )}</TableCell>
                </TableRow>
            </Table>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Button variant="contained" sx={{borderRadius: "28px"}} color="secondary">Reject suggestions</Button>
            <Button variant="outlined" sx={{borderRadius: "28px", width: "150px"}}>Edit</Button>
            <Button variant="contained" sx={{borderRadius: "28px", width: "150px"}}>Approve</Button>
            </Box>
        </Box>
      </Modal>
    )
  }

  return (
    <>
    <Box sx={{backgroundColor: "#ffe6e8", m: 3, borderRadius: "10px", pb: 1}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flagged by:</TableCell>
            <TableCell>Date flagged</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Street</TableCell>
            <TableCell>City</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flaggedBathrooms.map((bathroom) => (
            <>
              <TableRow>
                <TableCell>{bathroom.username}</TableCell>
                <TableCell>{`${stringifyDate(bathroom.created_at)}`}</TableCell>
                <TableCell>{bathroom.original_name}</TableCell>
                <TableCell>{bathroom.original_street}</TableCell>
                <TableCell>{`${bathroom.original_city}, ${bathroom.original_state}`}</TableCell>
                <TableCell>
                  <Button
                    color="info" 
                    variant="contained" 
                    size="small"
                     sx={ { borderRadius: 28 } } 
                    onClick={() => handleReview(bathroom)}
                  > 
                  Review suggested edits
                  </Button>
    <ReviewBathroomModal 
      open={reviewModalOpen}
      setReviewModalOpen={setReviewModalOpen}
      handleClose={handleClose}
      bathroom={bathroom}
    />
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
