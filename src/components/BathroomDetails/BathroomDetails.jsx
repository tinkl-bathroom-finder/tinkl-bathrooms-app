import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function IPeedHereModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          How was your experience?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Text>Your feedback helps keeps our app up-to-date.</Form.Text>
        <br/>
        <h4></h4>
        <>
          <Form.Label htmlFor="comment">Leave a comment:</Form.Label>
          <Form.Control type="text" id="comment" />
        </>
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
      <Button onClick={returnToList}>Back to List</Button>
      <br />
      <br />
      {/* 👇 makes button block-level (take up the full screen width) */}
      <div className="d-grid gap-2">
        <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          size="lg"
          variant="warning"
        >
          I peed here!
        </Button>
      </div>

      <IPeedHereModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default BathroomDetails;
