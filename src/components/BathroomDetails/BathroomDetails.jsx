import React, { useEffect, useState, createRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Business, Close } from "@mui/icons-material";
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
  Grid,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";

import BusinessHours from "../BathroomItem/BusinessHours";

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
  ThumbUpOutlined,
} from "@mui/icons-material";
// import PlaceIcon from "@mui/icons-material/Place";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Man4Icon from '@mui/icons-material/Man4';
import { styled } from "@mui/material/styles";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function IPeedHereModal(props) {
  const dispatch = useDispatch();
  const [voteSelected, setVoteSelected] = useState(false); // state tracking whether the user has voted
  const submitFeedback = () => {
    // Check if the user has voted before submitting feedback
    if (voteSelected) {

    // if a user is signed in, submit will send feedback; otherwise,
    // an alert will popup asking the guest to log in to leave feedback.
    console.log("onHide:", props.onHide);
    if (props.userId) {
      console.log("feedbackObject:", props.feedbackObject);
      dispatch({
        type: "SAGA/SEND_FEEDBACK",
        payload: props.feedbackObject,
      });
      Swal.fire({
        title: "Thank you for sharing! Users help keep this app up-to-date.",
        width: 600,
        padding: "3em",
        color: "#716add",
        background:
          "#fff url(https://media.giphy.com/media/ifMCKz51hfD9RUWXbI/giphy.gif)",
        backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.giphy.com/media/mTs11L9uuyGiI/giphy.gif")
        left top
        no-repeat
      `,
      });
    } else if (!props.userId) {
      Swal.fire({
        title: "Register or log in to leave feedback!",
        text: "Users help keep this app up-to-date.",
        icon: "question",
      });
      // closes modal after submitting feedback
    }
    props.onHide();
  } else {
    // Show a message indicating that the user needs to vote before submitting
    Swal.fire({
      title: "Please vote before submitting feedback!",
      icon: "error",
    });
  }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          How was your experience?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ToggleButtonGroup type="radio" name="options">
            <ToggleButton
              id="tbg-radio-2"
              value={2}
              onClick={() => props.handleVoteChange(2)}
            >
              👍
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-3"
              value={1}
              onClick={() => props.handleVoteChange(1)}
            >
              👎
            </ToggleButton>
          </ToggleButtonGroup>
          <br />
          <Form.Group controlId="commentForm">
            <Form.Label>Leave a comment:</Form.Label>
            <Form.Control
              componentClass="input"
              id="comment"
              type="text"
              aria-describedby="comment"
              onChange={(e) => props.handleInputChange(e)}
              value={props.comment}
              // inputRef = {(ref) => this.comment = ref }
              // ref="ReactDOM.findDOMNode(ref)"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          as="input"
          type="submit"
          value="Submit"
          onClick={submitFeedback}
        ></Button>
      </Modal.Footer>
    </Modal>
  );
}

function BathroomDetails() {
  // this gets us the bathroom id that exists in the url bar
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const theBathroomDetails = useSelector((store) => store.bathroomDetails);
  const commentArray = useSelector((store) => store.bathroomDetails.comments);
  const [expanded, setExpanded] = useState(false);
  const bathroom = theBathroomDetails;

  // Bathroom open/close 
  const date = new Date();
  let day = date.getDay(); // day comes back as number => 1 is Monday, 2 is Tuesday, etc.
  let hour = date.getHours() * 100; // formats hour as military time
  let minutes  = date.getMinutes();
  let militaryTime = hour + minutes // we don't actually need to convert this to a string since we want to compare it as a numeral


   const compareTime = () => {
    let isOpen = false;
    if (day = 1 && militaryTime >= bathroom.day_1_open && militaryTime <= bathroom.day_1_close){
      isOpen = true;
    }  else if (day = 2 && militaryTime >= bathroom.day_2_open && militaryTime <= bathroom.day_2_close){
      isOpen = true;
    } else if (day = 3 && militaryTime >= bathroom.day_3_open && militaryTime <= bathroom.day_3_close){
       isOpen = true;
    } else if (day = 4 && militaryTime >= bathroom.day_4_open && militaryTime <= bathroom.day_4_close){
      isOpen = true;
    } else if (day = 5 && militaryTime >= bathroom.day_5_open && militaryTime <= bathroom.day_5_close){
      isOpen = true;
    } else if (day = 6 && militaryTime >= bathroom.day_2_open && militaryTime <= bathroom.day_2_close){
      isOpen = true;
    }  else if (day = 7 && militaryTime >= bathroom.day_2_open && militaryTime <= bathroom.day_2_close){
      isOpen = true;
    }  else{console.log('close')
    } return isOpen;
   }

  let isOpen = compareTime();




  // React state for IPeedHereModal
  const [modalShow, setModalShow] = useState(false);

  // React state for MarkAsFlaggedModal
  const [modal2Show, setModal2Show] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);
  let userId = useSelector((store) => store.user.id);

  // opens bathroom in GoogleMaps in new tab
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const clickSomethingNotLookRight = () => {
    if (userId) {
      setModal2Show(true);
    } else
      Swal.fire({
        title: "Hey, stranger.",
        imageUrl: "https://media.giphy.com/media/HULqwwF5tWKznstIEE/giphy.gif",
        imageWidth: 360,
        imageHeight: 203,
        imageAlt: "Goat unicorn",
        text: "Come here often? Log in to leave feedback!",
        confirmButtonText: "Log in",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
  };

  const clickIPeedHere = () => {
    if (userId) {
      setModalShow(true);
    } else
      Swal.fire({
        title: "Hey, stranger.",
        imageUrl: "https://media.giphy.com/media/HULqwwF5tWKznstIEE/giphy.gif",
        imageWidth: 360,
        imageHeight: 203,
        imageAlt: "Goat unicorn",
        text: "Come here often? Log in to leave feedback!",
        confirmButtonText: "Log in",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
  };

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

    // get users current time for this bathroom 
    // getDateTime();
    
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
            maxHeight: "82vh",
          }}
        >
          
          {/* BACK button */}
          <Button
            onClick={returnToList}
            size="lg"
            sx={{
              display: "inline",
              ml: 2,
              mt: 3,
              mr: 3,
              mb: 0,
            }}
            variant="outlined"
          >
            <Typography color="#5272F2">Back</Typography>
          </Button>

          {/* when theBathroomDetails info was last updated */}
          <Typography
            sx={{ fontSize: 14, ml: 13, mt: 3, display: "inline" }}
            color="text.secondary"
            align="right"
          >
            {`Updated ${stringifyDate(theBathroomDetails.updated_at)}`}
          </Typography>

          <CardHeader
            // avatar={<Close/>}
            title={theBathroomDetails.name}
            subheader={`${theBathroomDetails.street}, ${theBathroomDetails.city}, MN`}
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
              mb: 0,
              pb: 0,
            }}
          />

          <CardContent
            sx={{
              mb: 0,
              pt: 1,
            }}
          >
                 <h6 class={isOpen ? "open" : "closed"}> {isOpen ? 'Open now' : 'Closed'}</h6>
            {/* upvotes and downvotes */}
            <Typography align="left">
              {theBathroomDetails.upvotes || 0}
              <ThumbUpOutlined sx={{ pr: 1 }} />
              {theBathroomDetails.downvotes || 0}
              <ThumbDownOutlined sx={{ pr: 1 }} />
            </Typography>{" "}

            <BusinessHours bathroom={bathroom}/>

            <CardActions></CardActions>
            {/* icons to show if the selected bathroom is all-gender, etc. */}
            <Typography variant="h5" gutterBottom sx={{ display: "inline" }}>
              {theBathroomDetails.unisex ? (
                <>
                  <TransgenderOutlined sx={{ display: "inline" }} />
                  <Typography sx={{ display: "inline" }}>
                    {" "}
                    Gender-neutral
                  </Typography>
                </>
              ) : (
                ""
              )}
              {/* has changing table */}
              {theBathroomDetails.changing_table ? (
                <>
                  <br />
                  <BabyChangingStationOutlined sx={{ display: "inline" }} />
                  <Typography sx={{ display: "inline" }}>
                    {" "}
                    Changing table
                  </Typography>
                </>
              ) : (
                ""
              )}

              {/* is wheelchair accessible */}
              {theBathroomDetails.accessible ? (
                <>
                  <br />
                  <AccessibleForwardOutlined sx={{ display: "inline" }} />
                  <Typography sx={{ display: "inline" }}>
                    {" "}
                    Wheelchair accessible
                  </Typography>
                </>
              ) : (
                ""
              )}

              {/* is single-stall */}
              {theBathroomDetails.is_single_stall ? (
                <>
                  <br />
                  <Man4 sx={{ display: "inline" }} />
                  <Typography sx={{ display: "inline" }}>
                    Single stall
                  </Typography>
                </>
              ) : (
                ""
              )}
            </Typography>

            {/* <Typography>{theBathroomDetails.weekday_text}</Typography> */}

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
            <CommentList commentArray={theBathroomDetails.comments} />
                
            {/* button to open IPeedHereModal */}
            <Button
              onClick={() => clickIPeedHere()}
              position="fixed"
              size="lg"
              sx={{
                ml: "33%",
                mt: "3px",
              }}
              variant="contained"
            >
              <Typography color="white">I peed here!</Typography>
            </Button>
            <CardActions disableSpacing>
              <Typography> Something not look right?</Typography>
              <IconButton onClick={() => clickSomethingNotLookRight()}>
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
        show={modal2Show}
        setModal2Show={setModal2Show}
        onHide={() => setModal2Show(false)}
        aria-labelledby="something-isnt-right-modal"
        aria-describedby="Form to flag outdated or bad information about the bathroom."
        details={theBathroomDetails}
      />
    </>
  );
}

export default BathroomDetails;
