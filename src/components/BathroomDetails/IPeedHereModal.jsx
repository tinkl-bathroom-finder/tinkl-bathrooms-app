import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Button } from "@mui/material";

function IPeedHereModal(props) {
    const dispatch = useDispatch();
    const params = useParams();
    let [upvote, setUpvote] = useState(0);
    let [downvote, setDownvote] = useState(0);
    let [comment, setComment] = useState(""); // sets local state for comment
    let userId = useSelector((store) => store.user.id);
  
    let feedbackObject = {
      upvote: upvote,
      downvote: downvote,
      comment: comment,
      restroom_id: params.id,
      user_id: userId,
    };
  
    // handle change event
    const handleInputChange = (e) => {
      e.preventDefault();
      console.log("feedbackObject:", feedbackObject);
      setComment(e.target.value);
    };
  
    const handleVoteChange = (value) => {
      console.log("value: ", value);
      // if thumbs-up button is clicked, upvote gets set to 1 and downvote set to 0
      // if thumbs-down button is clicked, downvote gets set to 1 and upvote to 0
      if (value === 2) {
        setUpvote(1);
        setDownvote(0);
      } else if (value === 1) {
        setUpvote(0);
        setDownvote(1);
      }
    };

    const submitFeedback = () => {
      // if a user is signed in, submit will send feedback; otherwise,
      // an alert will popup asking the guest to log in to leave feedback.
      if (userId) {
        console.log("feedbackObject:", feedbackObject);
        dispatch({
          type: "SAGA/SEND_FEEDBACK",
          payload: feedbackObject,
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
      } else if (!userId) {
        Swal.fire({
          title: "Register or log in to leave feedback!",
          text: "Users help keep this app up-to-date.",
          icon: "question",
        });
        // closes modal after submitting feedback
      }
      props.setModalShow(false)
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
        {/* 🔥🔥🔥🔥🔥 TO-DO: delete onClick function after using for app demonstration video!! */}
          <Modal.Title id="contained-modal-title-vcenter" onClick={() => setComment('Two gender-neutral, single-stall bathrooms in the back.')}>
            How was your experience?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <ToggleButtonGroup type="radio" name="options" class="text-center">
              <ToggleButton
                id="tbg-radio-2"
                value={2}
                onClick={() => handleVoteChange(2)}
              >
                👍
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-3"
                value={1}
                onClick={() => handleVoteChange(1)}
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
                onChange={(e) => handleInputChange(e)}
                value={comment}
                // inputRef = {(ref) => this.comment = ref }
                // ref="ReactDOM.findDOMNode(ref)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
          variant="contained"
            type="submit"
            onClick={submitFeedback}
          >Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  export default IPeedHereModal;