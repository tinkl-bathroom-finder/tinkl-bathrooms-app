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
  Public,
  TransgenderOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import EditBathroomModal from "./EditBathroomModal";

function ApproveBathrooms() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const bathroomsToApprove = useSelector((store) => store.bathroomsToApprove);


  const [modal2Show, setModal2Show] = useState(false);
  const [addressForModal, setAddressForModal] = useState('');
  const [nameForModal, setNameForModal] = useState('');

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

  const clickEdit = () => {

    setModal2Show(true)
  }

  return (
    <Box sx={{backgroundColor: "#ffe6e8", m: 3, borderRadius: "10px", pb: 1}}>
    <Table sx={{textAlign: 'center'}}>
      <TableHead>
        <TableRow>
          <TableCell>Added by</TableCell>
          <TableCell>Date added</TableCell>
          <TableCell>Bathroom name</TableCell>
          <TableCell>Street</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Amenities</TableCell>
          <TableCell align="center">Delete</TableCell>
          <TableCell align="center">Edit</TableCell>
          <TableCell align="center">Approve</TableCell>
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
          <TableCell sx={{}}>
          {item.unisex ? <TransgenderOutlined /> : ""}
          {item.changing_table ?  <BabyChangingStationOutlined /> : ""}
          {item.accessible ? <AccessibleForwardOutlined /> : ""}
          {item.is_single_stall ? <Man4 /> : ""}
          {item.public ? <Public /> : ""}
          </TableCell>
          <TableCell align="center">
            <Button color="error" variant="contained" size="small" sx={ { borderRadius: 28 } } onClick={() => deleteBathroomFromDatabase(item)}>
              <Delete/>
              </Button>
          </TableCell>
            <TableCell align="center">
              <Button color="primary" variant="contained" size="small" sx={ { borderRadius: 28 } } onClick={() => clickEdit()}>
                <Edit/>
              </Button>
            </TableCell>
          <TableCell align="center">
            <Button color="success" variant="contained" size="small" sx={ { borderRadius: 28, color: 'white' } }>
              <CheckCircle/>
            </Button>
            </TableCell>
                <EditBathroomModal
                  show={modal2Show}
                  setModal2Show={setModal2Show}
                  onHide={() => setModal2Show(false)}
                  item={item}
                  addressForModal={item.street}
                  setAddressForModal={setAddressForModal}
                  nameForModal={item.name}
                  setNameForModal={setNameForModal}
                  latitude={item.latitude}
                  longitude={item.longitude}
                  accessible={item.accessible}
                  public={item.public}
                  unisex={item.unisex}
                  changing_table={item.changing_table}
                  is_single_stall={item.is_single_stall}



    />
      </TableRow>
 ))} 

      </TableBody>
    </Table>


  </Box>
  );
}

export default ApproveBathrooms;
