import React, { useEffect, useState, createRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  IconButton,
  CardMedia,
} from "@mui/material";



import Collapse from "@mui/material/Collapse";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import BabyChangingStationOutlinedIcon from '@mui/icons-material/BabyChangingStationOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import TransgenderOutlinedIcon from '@mui/icons-material/TransgenderOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";


function IPeedHereModal(props) {
  const dispatch = useDispatch();
  const submitFeedback = () => {
    // if a user is signed in, submit will send feedback; otherwise,
    // an alert will popup asking the guest to log in to leave feedback.
    console.log('onHide:', props.onHide)
    if (props.userId){
      console.log('feedbackObject:', props.feedbackObject)
    dispatch({
      type: 'SAGA/SEND_FEEDBACK',
      payload: props.feedbackObject
    })
    Swal.fire({
      title: "Thank you for sharing! Users help keep this app up-to-date.",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(https://media.giphy.com/media/ifMCKz51hfD9RUWXbI/giphy.gif)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.giphy.com/media/mTs11L9uuyGiI/giphy.gif")
        left top
        no-repeat
      `
    });

  } else if (!props.userId) {
    alert('Register as a user to leave feedback.')
    // closes modal after submitting feedback
  } props.onHide()
}

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
          <ToggleButton id="tbg-radio-2" value={2} onClick={() => props.handleVoteChange(2)}>
            👍
          </ToggleButton>
          <ToggleButton id="tbg-radio-3" value={1}  onClick={() => props.handleVoteChange(1)}>
            👎
          </ToggleButton>
        </ToggleButtonGroup>
        <br />
        <Form.Group controlId="commentForm">
        <Form.Label>Leave a comment:</Form.Label>
        <Form.Control
          // componentClass="input"
          // id="comment"
          type="text"
          // aria-describedby="comment"
          onChange={(e) => props.handleInputChange(e)}
          value={props.comment}
          // inputRef = {(ref) => this.comment = ref }
          // ref="ReactDOM.findDOMNode(ref)"
        />
        </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button as="input" type="submit" value="Submit" onClick={submitFeedback}></Button>
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
  const [modalShow, setModalShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let [upvote, setUpvote] = useState(0)
  let [downvote, setDownvote] = useState(0)
  let [comment, setComment] = useState(""); // sets local state for comment
  let userId = useSelector(store => store.user.id)
  
  let feedbackObject = {
    upvote: upvote,
    downvote: downvote,
    comment: comment,
    restroom_id: params.id,
    user_id: userId
  }

// animation for 'expand comments' chevron
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

  // handle change event
  const handleInputChange = (e) => {
      e.preventDefault();
      console.log('feedbackObject:', feedbackObject)
      setComment(e.target.value);
  };

  const handleVoteChange = (value) => {
    console.log('value: ', value)
    // if thumbs-up button is clicked, upvote gets set to 1 and downvote set to 0
    // if thumbs-down button is clicked, downvote gets set to 1 and upvote to 0
    if (value === 2){
    setUpvote(1)
    setDownvote(0)
    } else if (value === 1){
      setUpvote(0)
      setDownvote(1)
      }
    // console.log('Upvote:', upvote)
    // console.log('Downvote:', downvote)
  };

    // formats inserted_at timestamp as readable string
    const stringifyDate = (timestamp) => {
      const date = new Date(timestamp);
      const options = { year: "numeric", month: "short", day: "numeric" };
      const stringifiedDate = date.toLocaleDateString("en-us", options);
      return stringifiedDate;
    };


  useEffect(() => {
    // should log the id of the restroom we're currently on (would expect this to log: {id: '5'} if our browser is at localhost:3000/bathrooms/5)
    console.log("params: ", params);
    // Fire a dispatch that calls a fetchBathroomDetails Saga function
    dispatch({
      type: "SAGA/FETCH_BATHROOM_DETAILS",
      payload: params.id,
    });
  }, [params.id]); // 👈 useEffect will retrigger if params.id (the id in url) changes

  const returnToList = () => {
    history.goBack()
  };

  return (<>
<Box
        key={theBathroomDetails.id}
        width="100%"
        // padding-left (https://mui.com/system/spacing/)
        pl="20px"
      >
        <Card
          sx={{
            mb: "20px",
            mt: "25px",
            mr: "25px"
          }}
        >
                  {/* when theBathroomDetails info was last updated */}
            <Typography sx={{ fontSize: 14,
            mr: 2, mt: 3 }} color="text.secondary" align="right">
              {"Updated " + stringifyDate(theBathroomDetails.updated_at)}
            </Typography>

          <CardHeader
            title={theBathroomDetails.name}
            subheader={theBathroomDetails.street + ", " + theBathroomDetails.city + ", MN"}
          >
          </CardHeader>
          <CardMedia />
          <CardContent>

            <CardActions>
              {/* 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 make this link to Google Maps directions! */}
              <Button>
                <NearMeOutlinedIcon />
              </Button>
            </CardActions>

            {/* icons to show if theBathroomDetailss is all-gender, has changing table, is wheelchair accessible */}
            <Typography variant="h5" gutterBottom>{theBathroomDetails.unisex ? <TransgenderOutlinedIcon/>: ''}{theBathroomDetails.changing_table ? <BabyChangingStationOutlinedIcon/>: ''}{theBathroomDetails.accessible ? <AccessibleForwardOutlinedIcon/>: ''}</Typography>

            {/* theBathroomDetails upvotes and downvotes */}
            <Typography align="right">
              {theBathroomDetails.upvotes || 0}
              <ThumbUpOutlinedIcon sx={{ pr: 1}}/>
            {(theBathroomDetails.downvotes) || 0}
            <ThumbDownOutlinedIcon sx={{ pr: 1}}/>
            </Typography>
            <Button>
              <OutlinedFlagOutlinedIcon />
            </Button>
            <Button onClick={returnToList} variant="outlined">
        Back
      </Button>
      <Button
          variant="contained"
          onClick={() => setModalShow(true)}
          size="lg"
          sx={{
            ml: 20
          }}
        >
          I peed here!
        </Button>

          </CardContent>
{/* moves chevron to right */}
          <CardActions disableSpacing>
            <Button><ExpandMoreIcon /></Button>
            
            <ExpandMore></ExpandMore>
            {/* distance from current/searched location */}
            <Typography align="right" color="text.secondary"  sx={{
            mr: 2}} >
              {theBathroomDetails.distance ? `${theBathroomDetails.distance.toFixed(2)} mi` : ""}
            </Typography>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Comments:</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>

    <div>{ theBathroomDetails && <>
      <h2>{theBathroomDetails.name}</h2>
      <h4>{theBathroomDetails.street}</h4>
      <p>{theBathroomDetails.directions}</p>
      {/* <p>Last updated: {JSON.stringify(theBathroomDetails.updated_at).slice(0, -14)}</p> */}
      <p>Last updated: {stringifyDate(theBathroomDetails.updated_at) || 'no info'}</p>
      <p>Gender-neutral: {theBathroomDetails.unisex === true ? "yes" : "no"}</p>
      {/* if a bathrooms has upvotes or downvotes, they will display; otherwise it will show "0" */}
      <p>Upvotes: {theBathroomDetails.upvotes || 0}</p>
      <p>Downvotes: {theBathroomDetails.downvotes || 0}</p>
      <p>Changing Table: {theBathroomDetails.changing_table ? 'yes' : 'no'}</p>
      <p>Wheelchair Accessible: {theBathroomDetails.accessible ? 'yes' : 'no'}</p>
      <h5>Comments:</h5>
      <p>{theBathroomDetails.comments ? theBathroomDetails.comments.map((comment) => (
        <p>{comment}</p>
      )) : ''}</p>
      </>}
      <Button onClick={returnToList} variant="outlined">
        Back
      </Button>
      <br />
      <br />

      {/* 👇 className="d-grid gap-2" makes button block-level (take up the full screen width) */}
      <div>
        <Button
          variant="contained"
          onClick={() => setModalShow(true)}
          size="lg"
        >
          I peed here!
        </Button>
      </div>

      <IPeedHereModal 
        show={modalShow} 
        onHide={() => setModalShow(false)} 
        comment={comment} 
        handleInputChange={(e) => handleInputChange(e)} 
        upvote={upvote} 
        handleVoteChange={handleVoteChange} 
        userId={userId} 
        feedbackObject={feedbackObject}/>
    </div>
  </>);
}

export default BathroomDetails;
