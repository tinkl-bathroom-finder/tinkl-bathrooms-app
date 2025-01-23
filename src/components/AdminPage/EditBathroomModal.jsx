import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

function EditBathroomModal(props) {
    const dispatch = useDispatch();
    const history = useHistory();
  
    // console.log("props: ", props)
  
    let [comment, setComment] = useState(""); // sets local state for comment
    let [accessible, setAccessible] = useState(props.accessible);
    let [isPublic, setIsPublic] = useState(props.public);
    let [unisex, setUnisex] = useState(props.unisex);
    let [changingTable, setChangingTable] = useState(props.changing_table);
    let [singleStall, setSingleStall] = useState(props.is_single_stall);
    let [commentForAdmin, setCommentForAdmin] = useState("");
  
    let userId = useSelector((store) => store.user.id);
  
    let bathroomToAdd = {
      placeID: props.placeID,
      name: props.nameForModal,
      formatted_address: props.addressForModal,
      accessible: accessible,
      is_public: isPublic,
      unisex: unisex,
      changing_table: changingTable,
      single_stall: singleStall,
      latitude: props.latitude,
      longitude: props.longitude,
      user_id: userId,
      commentForAdmin: commentForAdmin,
      comment: comment
    }
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      borderRadius: 2
    }
  
    // handle change
  
    const setNameValue = (e) => {
      e.preventDefault();
      props.setNameForModal(e.target.value);
    }
    const setAddressValue = (e) => {
      e.preventDefault();
      props.setAddressForModal(e.target.value);
    }
    const setAccessibleValue = () => {
      setAccessible(!accessible);
    }
    const setChangingTableValue = () => {
      setChangingTable(!changingTable);
    }
    const setUnisexValue = () => {
      setUnisex(!unisex);
    }
    const setSingleStallValue = () => {
      setSingleStall(!singleStall);
    }
    const setPublicValue = () => {
      setIsPublic(!isPublic);
    }
    const setCommentValue = (e) => {
      e.preventDefault();
      setComment(e.target.value);
    }
    const setCommentForAdminValue = (e) => {
      e.preventDefault();
      setCommentForAdmin(e.target.value);
    }
  
    const submitPopup = () => {
      console.log("bathroomToAdd:", bathroomToAdd);
        dispatch({
          type: "SAGA/GET_PLACE_DETAILS",
          payload: bathroomToAdd
        });
        dispatch({
          type: "SAGA/CLEAR_ADD_BATHROOM",
          payload: bathroomToAdd
        });
      // closes modal
      props.setModal2Show(false);
      history.push("/bathrooms");
    }
  
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="sm"
        aria-labelledby="modal-title"
        centered
      >
        <Box sx={style}>
          <Modal.Header id="modal-title">
            <Modal.Title>
              Review bathroom info:
            </Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <Form>
  
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setNameValue(e)}
                  value={props.nameForModal}
                  required />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setAddressValue(e)}
                  value={props.addressForModal}
                  required
                />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Bathroom amenities:</Form.Label>
  
                <Form.Check
                  type="checkbox"
                  label="Wheelchair accessible"
                  onChange={() => setAccessibleValue()}
                />
  
                <Form.Check
                  type="checkbox"
                  label="Changing table"
                  onChange={() => setChangingTableValue()}
                />
  
                <Form.Check
                  type="checkbox"
                  label="Gender neutral/all-gender"
                  onChange={() => setUnisexValue()}
                />
  
                <Form.Check
                  type="checkbox"
                  label="Single stall"
                  onChange={() => setSingleStallValue()}
                />
  
                <Form.Check
                  type="checkbox"
                  label="Open to the public"
                  onChange={() => setPublicValue()}
                />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Add a comment:</Form.Label>
                <Form.Control type="text"
                  onChange={(e) => setCommentValue(e)} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Any other information that admin should know?</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setCommentForAdminValue(e)} />
              </Form.Group>
  
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" sx={{ mr: 2 }} data-bs-dismiss="modal" onClick={() => props.setModal2Show(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => submitPopup()}>Approve bathroom</Button>
          </Modal.Footer>
        </Box>
      </Modal>
    );
  }

  export default EditBathroomModal;