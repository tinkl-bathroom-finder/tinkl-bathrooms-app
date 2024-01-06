import React, { useEffect, useState, createRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

function IPeedHereModal(props) {

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
        <ToggleButtonGroup type="radio" name="options">
          <ToggleButton id="tbg-radio-2" value={2} onClick={(e) => props.handleVoteChange(e)}>
            👍
          </ToggleButton>
          <ToggleButton id="tbg-radio-3" value={1}  onClick={(e) => props.handleVoteChange(e)}>
            👎
          </ToggleButton>
        </ToggleButtonGroup>
        <br />
        <Form>
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
        <Button as="input" type="submit" value="Submit"></Button>
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

  let [vote, setVote] = useState(0)
  let [comment, setComment] = useState(""); // sets local state for comment
  // handle change event
  const handleInputChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
    console.log("comment:", e.target.value);
  };

  const handleVoteChange = (e) => {
    e.preventDefault();
    setVote(e.target.value);
    console.log("vote (1 is down, 2 is up):", e.target.value);
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


  console.log(comment)
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

      <IPeedHereModal show={modalShow} onHide={() => setModalShow(false)} comment={comment} handleInputChange={handleInputChange} vote={vote} handleVoteChange={handleVoteChange}/>
    </div>
  );
}

export default BathroomDetails;
