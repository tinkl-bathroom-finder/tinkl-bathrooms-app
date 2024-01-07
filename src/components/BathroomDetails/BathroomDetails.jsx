import React, { useEffect, useState, createRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

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
  // handle change event
  const handleInputChange = (e) => {
      e.preventDefault();
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


  useEffect(() => {
    // should log the id of the restroom we're currently on (would expect this to log: {id: '5'} if our browser is at localhost:3000/bathrooms/5)
    console.log("params: ", params);
    // Fire a dispatch that calls a fetchBathroomDetails Saga function
    dispatch({
      type: "SAGA/FETCH_BATHROOM_DETAILS",
      payload: params.id,
    });
    console.log("theBathroomDetails after being fetched: ", theBathroomDetails);
  }, [params.id]); // 👈 useEffect will retrigger if params.id (the id in url) changes

  const returnToList = () => {
    history.push("/bathrooms");
  };

  console.log('comment:', comment)
  return (
    <div>
      <h2>{theBathroomDetails.name}</h2>
      <h4>{theBathroomDetails.street}</h4>
      <p>{theBathroomDetails.directions}</p>
      {/* <p>Last updated: {JSON.stringify(theBathroomDetails.updated_at).slice(0, -14)}</p> */}
      <p>Last updated: {theBathroomDetails.updated_at}</p>
      <p>Gender-neutral: {theBathroomDetails.unisex === true ? "yes" : "no"}</p>
      {/* if a bathrooms has upvotes or downvotes, they will display; otherwise it will show "0" */}
      <p>Upvotes: {theBathroomDetails.upvotes || 0}</p>
      <p>Downvotes: {theBathroomDetails.downvotes || 0}</p>
      <h5>Comments:</h5>
      <p>{theBathroomDetails.content}</p>
      <Button onClick={returnToList} variant="secondary">
        Back to List
      </Button>
      <br />
      <br />
      {/* 👇 className="d-grid gap-2" makes button block-level (take up the full screen width) */}
      <div>
        <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          size="lg"
          variant="warning"
        >
          I peed here!
        </Button>
      </div>

      <IPeedHereModal show={modalShow} onHide={() => setModalShow(false)} comment={comment} handleInputChange={handleInputChange} upvote={upvote} handleVoteChange={handleVoteChange} userId={userId} feedbackObject={feedbackObject}/>
    </div>
  );
}

export default BathroomDetails;
