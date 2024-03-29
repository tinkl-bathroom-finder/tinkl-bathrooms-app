import React, { useEffect, useState, createRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Close } from "@mui/icons-material";
import CommentList from "./Comments";
import IPeedHereModal from "./IPeedHereModal";
import MarkAsFlaggedModal from "./MarkAsFlaggedModal";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  IconButton,
  CardMedia,
  Grid
} from "@mui/material";
import Collapse from "@mui/material/Collapse";

// import Grid from '@mui/material/Unstable_Grid2';
import {
  AccessibleForwardOutlined, 
  BabyChangingStationOutlined,
  ExpandMore, 
  Man4,
  NearMeOutlined,
  OutlinedFlagOutlined,
  Place,
  TransgenderOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined} from "@mui/icons-material"
// import PlaceIcon from "@mui/icons-material/Place";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Man4Icon from '@mui/icons-material/Man4';
import { styled } from "@mui/material/styles";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function BathroomDetails() {
  // this gets us the bathroom id that exists in the url bar
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const theBathroomDetails = useSelector((store) => store.bathroomDetails);
  const commentArray = useSelector((store) => store.bathroomDetails.comments);
  const [modalShow, setModalShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
 const [open, setOpen] = useState(true);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);
  let userId = useSelector((store) => store.user.id);

  // opens bathroom in GoogleMaps in new tab
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let [upvote, setUpvote] = useState(0);
  let [downvote, setDownvote] = useState(0);
  let [comment, setComment] = useState(""); // sets local state for comment
  let userId = useSelector((store) => store.user.id);

  let feedbackObject = {
    upvote: upvote,
    downvote: downvote,
    comment: comment,
    restroom_id: Number(params.id),
    user_id: userId,
  };

  // handle change event
  const handleInputChange = (e) => {
    e.preventDefault();
    console.log("you did indeed click the flag!")
    if (userId) {
      handleOpen;
    } else
    Swal.fire({
    title: "Hey, stranger.",
      imageUrl: "https://media.giphy.com/media/HULqwwF5tWKznstIEE/giphy.gif",
      imageWidth: 360,
      imageHeight: 203,
      imageAlt: "Goat unicorn",
    text: "Come here often? Log in to leave feedback!",
    confirmButtonText: "Log in"
  }).then((result) => {
    if (result.isConfirmed) {
  history.push('/login')
}})
  }

  const clickIPeedHere = () => {
    if (userId){
      setModalShow(true)
    } else
      Swal.fire({
      title: "Hey, stranger.",
        imageUrl: "https://media.giphy.com/media/HULqwwF5tWKznstIEE/giphy.gif",
        imageWidth: 360,
        imageHeight: 203,
        imageAlt: "Goat unicorn",
      text: "Come here often? Log in to leave feedback!",
      confirmButtonText: "Log in"
    }).then((result) => {
      if (result.isConfirmed) {
    history.push('/login')
  }})
  }

  // formats inserted_at timestamp as readable string
  const stringifyDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const stringifiedDate = date.toLocaleDateString("en-us", options);
    return stringifiedDate;
  };

  useEffect(() => {
    // gets user's current location and sets coordinates in React state for directions
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLat(position.coords.latitude);
      setCurrentLng(position.coords.longitude);
    });
    // should log the id of the restroom we're currently on (would expect this to log: {id: '5'} if our browser is at localhost:3000/bathrooms/5)
    console.log("params: ", params);
    // Fire a dispatch that calls a fetchBathroomDetails Saga function
    dispatch({
      type: "SAGA/FETCH_BATHROOM_DETAILS",
      payload: params.id,
    });
  }, [params.id]); // 👈 useEffect will retrigger if params.id (id in url) changes

  const returnToList = () => {
    history.goBack();
  };

  const setCurrentPosition = () => {};

  return (
    <>
      <Box key={theBathroomDetails.id} width="100%" pl="20px">
        <Card
          sx={{
            mb: "20px",
            mt: "25px",
            mr: "25px",
            pr: "10px",
            maxHeight: '82vh'
          }}>

            {/* BACK button */}
        <Button onClick={returnToList}
        size="lg"
        sx={{
          display: 'inline', ml: 2, mt: 3, mr: 3, mb: 0
        }} 
        variant="outlined">
          <Typography color="#5272F2">Back</Typography>
        </Button>

          {/* when theBathroomDetails info was last updated */}
          <Typography
            sx={{ fontSize: 14, ml: 13, mt: 3, display: 'inline' }}
            color="text.secondary"
            align="right"
          >
            {`Updated ${stringifyDate(theBathroomDetails.updated_at)}`}
          </Typography>

          <CardHeader
            // avatar={<Close/>}
            title={theBathroomDetails.name}
            subheader={
              `${theBathroomDetails.street}, ${theBathroomDetails.city}, MN`
            }
            action={
              <Box>

                {/* Opens bathroom location in Google Maps */}
              <IconButton
                onClick={() =>
                  openInNewTab(
                    `https://www.google.com/maps/search/?api=1&query=${theBathroomDetails.name}`
                  )
                }
              >
                <Place />
              </IconButton>

                {/* Directions icon and link */}          
              <IconButton
                onClick={() =>
                  openInNewTab(
                    `https://www.google.com/maps/dir/?api=1&destination=${theBathroomDetails.name}`
                  )
                }
                
              >
                <NearMeOutlined />
              </IconButton>
              </Box>
            }
                sx={{
                  mb: 0, pb: 0
                }}
          />

          <CardContent
                sx={{
                  mb: 0, pt: 1
                }}>

            {/* upvotes and downvotes */}
            <Typography align="left">
              {theBathroomDetails.upvotes || 0}
              <ThumbUpOutlined sx={{ pr: 1}} />
              {theBathroomDetails.downvotes || 0}
              <ThumbDownOutlined sx={{ pr: 1 }} />
            </Typography>{" "}
            <CardActions>

            </CardActions>

            {/* icons to show if the selected bathroom is all-gender, etc. */}
            <Typography variant="h5" gutterBottom sx={{display: 'inline'}}>
              {theBathroomDetails.unisex ? (
                <>
                  <TransgenderOutlined   sx={{display: 'inline'}}/>
                  <Typography sx={{display: 'inline'}}> Gender-neutral</Typography>
                </>
              ) : (
                ""
              )}
{/* has changing table */}
              {theBathroomDetails.changing_table ? (
                <>
                <br/>
                  <BabyChangingStationOutlined  sx={{display: 'inline'}}/>
                  <Typography sx={{display: 'inline'}}> Changing table</Typography>
                </>
              ) : (
                ""
              )}

{/* is wheelchair accessible */}
              {theBathroomDetails.accessible ? (
                <>
                <br/>
                  <AccessibleForwardOutlined  sx={{display: 'inline'}}/>
                  <Typography sx={{display: 'inline'}}> Wheelchair accessible</Typography>
                </>
              ) : (
                ""
              )}

{/* is single-stall */}
              {theBathroomDetails.is_single_stall ? (
                <>
                <br/>
                  <Man4   sx={{display: 'inline'}}/>
                  <Typography  sx={{display: 'inline'}}>Single stall</Typography>
                </>
              ) : (
                ""
              )}
            </Typography>

            {/* distance from current/searched location */}
            <Typography
              align="left"
              color="text.secondary"
              sx={{
                mr: 2,
              }}
            >
              {theBathroomDetails.distance
                ? `${theBathroomDetails.distance.toFixed(2)} mi`
                : ""}
            </Typography>

            {/* if the bathroom has any comments, the comment list box will render */}
            {<CommentList commentArray={theBathroomDetails.comments} />}

{/* button to open IPeedHereModal */}
            <Button
              onClick={() => clickIPeedHere()}
              position='fixed'
              size="lg"
              sx={{
                ml: '33%',
                mt: "3px"
              }}
              variant="contained"
            >
              <Typography color="white" >I peed here!</Typography>
            </Button>

          <CardActions  disableSpacing>
              <Typography> Something not look right?</Typography>
            <IconButton onClick={(e) => clickSomethingNotLookRight(e)}>
              <OutlinedFlagOutlined
                sx={{
                  mr: 1,
                }}
              />
            </IconButton>

          </CardActions>
          </CardContent>
        </Card>
      </Box>

      <IPeedHereModal
        show={modalShow}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
      />

      <MarkAsFlaggedModal
      open={open}
      onClose={handleClose}
      setOpen={setOpen}
      aria-labelledby="something-isnt-right-modal"
      aria-describedby="Form to flag outdated or bad information about the bathroom."
      />
    </>
  );
}

export default BathroomDetails;
