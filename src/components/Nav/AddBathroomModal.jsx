import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AddBathroomModal(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("props.details: ", props.details)
  console.log("props.searchBarAddress.value: ", props.searchBarAddress.value)

  let [comment, setComment] = useState(""); // sets local state for comment
  let [name, setName] = useState(props.searchBarAddress?.value?.structured_formatting?.main_text);
  let [formattedAddress, setFormattedAddress] = useState(props.details.formatted_address);
  let [accessible, setAccessible] = useState(false);
  let [isPublic, setIsPublic] = useState(false);
  let [unisex, setUnisex] = useState(false);
  let [changingTable, setChangingTable] = useState(false);
  let [singleStall, setSingleStall] = useState(false);
  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);
  let [commentForAdmin, setCommentForAdmin] = useState("");

  let userId = useSelector((store) => store.user.id);

  let bathroomToAdd = {
    name: name,
    formatted_address: formattedAddress,
    accessible: accessible,
    is_public: isPublic,
    unisex: unisex,
    changing_table: changingTable,
    single_stall: singleStall,
    latitude: latitude,
    longitude: longitude,
    user_id: userId
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
  const setCommentValue = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  }
  const setNameValue = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }
  const setAddressValue = (e) => {
    e.preventDefault();
    setFormattedAddress(e.target.value);
  }
  const setAccessibleValue = () => {
    setAccessible(!accessible);
  }
  const setPublicValue = () => {
    setIsPublic(!isPublic);
  }
  const setUnisexValue = () => {
    setUnisex(!unisex);
  }
  const setChangingTableValue = () => {
    setChangingTable(!changingTable);
  }
  const setSingleStallValue = () => {
    setSingleStall(!singleStall);
  }
  const setCommentForAdminValue = (e) => {
    e.preventDefault();
    setCommentForAdmin(e.target.value);
  }

  const submitPopup = () => {
    // console.log("bathroomToAdd:", bathroomToAdd);
    // axios.post('/add', bathroomToAdd)
    //   .then((res) => {
    //     res.sendStatus(201)
        // popup window "confirming" submission
        Swal.fire({
          title: "Thank you for sharing! User-generated data is how we run.",
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
        }).then(function() {
          history.push(`/bathrooms/`);
        });
      // })
      //   .catch((error) => {
      //   console.log("Error adding bathroom:", error);
      //   res.sendStatus(500);
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "Something went wrong! Let's try this again.",

      //   });
      // })
            

  // closes modal
  props.setModal2Show(false);

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
          Add more info here:
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          <Form.Group>
            <Form.Label>Name*</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.searchBarAddress?.value?.structured_formatting?.main_text}
              onChange={(e) => setNameValue(e)}
              value={name}
              required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address*</Form.Label>
            <Form.Control
              type="text"
              defaultValue={`${props.details.formatted_address}`}
              onChange={(e) => setAddressValue(e)}
              value={formattedAddress} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Please check whether the following apply to this bathroom:</Form.Label>

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
        <Button variant="contained" onClick={() => submitPopup()}>Submit bathroom</Button>
      </Modal.Footer>
    </Box>
  </Modal>
);
}

export default AddBathroomModal;