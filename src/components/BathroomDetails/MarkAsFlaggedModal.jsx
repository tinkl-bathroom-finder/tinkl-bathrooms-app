import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Modal } from "react-bootstrap";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { PropaneRounded } from "@mui/icons-material";


function MarkAsFlaggedModal(props) {

  // modal open state
  let [isClosed, setIsClosed] = useState(false);

  // local state for bathroom to be flagged
  let [flaggedBathroom, setFlaggedBathroom] = useState({})

  // on mount, sets local state with bathroom details
  useEffect(() => {
    setFlaggedBathroom({
      name: props.details.name,
      street: props.details.street,
      city: props.details.city,
      state: props.details.state,
      accessible: props.details.accessible,
      changing_table: props.details.changing_table,
      unisex: props.details.unisex,
      menstrual_products: props.details.menstrual_products,
      is_single_stall: props.details.is_single_stall,
      other: '',
      is_removed: props.details.is_removed,
    })
  }, [])

  // controls bathroom state editing
  const editTextDetails = (event, key) => {
    setFlaggedBathroom({...flaggedBathroom, [key]: event.target.value})
    console.log(event.target.value)
  }
  const editCheckDetails = (key) => {
    setFlaggedBathroom({...flaggedBathroom, [key]: !flaggedBathroom[key]})
    console.log(flaggedBathroom)
  }

  // submission of bathroom edits
  const submitPopup = (event) => {
    event.preventDefault()
    // closes modal
    // props.setModal2Show(false);

    // popup window "confirming" submission
    console.log(event.target.value)
    // Swal.fire({
    //   title: "Thank you for sharing! Users help keep this app up-to-date.",
    //   width: 600,
    //   padding: "3em",
    //   color: "#716add",
    //   background:
    //     "#fff url(https://media.giphy.com/media/ifMCKz51hfD9RUWXbI/giphy.gif)",
    //   backdrop: `
    //     rgba(0,0,123,0.4)
    //     url("https://media.giphy.com/media/mTs11L9uuyGiI/giphy.gif")
    //     left top
    //     no-repeat
    //   `,
    // });
  }

  // mui styling
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
            Suggest changes here:
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
               type="text"
                disabled={isClosed}
                defaultValue={props.details.name} 
                onChange={() => editTextDetails(event, 'name')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control 
                type="text" 
                disabled={isClosed}
                defaultValue={props.details.street} 
                onChange={() => editTextDetails(event, 'street')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text" 
                disabled={isClosed}
                defaultValue={props.details.city} 
                onChange={() => editTextDetails(event, 'city')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control 
                type="text" 
                disabled={isClosed}
                defaultValue={props.details.state} 
                onChange={() => editTextDetails(event, 'state')}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              defaultChecked={props.details.accessible}
              label="Wheelchair accessible"
              disabled={isClosed}
              onChange={() => editCheckDetails('accessible')}
            />

            <Form.Check
              type="checkbox"
              defaultChecked={props.details.changing_table}
              label="Changing table"
              disabled={isClosed}
              onChange={() => editCheckDetails('changing_table')}
            />

            <Form.Check
              type="checkbox"
              defaultChecked={props.details.unisex}
              label="Gender neutral/all-gender"
              disabled={isClosed}
              onChange={() => editCheckDetails('unisex')}
            />

            <Form.Check
              type="checkbox"
              defaultChecked={props.details.single_stall}
              label="Single stall"
              disabled={isClosed}
              onChange={() => editCheckDetails('is_single_stall')}
            />

            <Form.Group>
              <Form.Label>Other:</Form.Label>
              <Form.Control 
                type="text" 
                disabled={isClosed}
                defaultValue={''} 
                onChange={() => editTextDetails(event, 'other')}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Location is permanently closed"
              onClick={() => setIsClosed(!isClosed)}
            />

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" sx={{ mr: 2 }} data-bs-dismiss="modal" onClick={() => props.setModal2Show(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => submitPopup(event)}>Submit changes</Button>
        </Modal.Footer>
      </Box>
    </Modal>
  );
}

export default MarkAsFlaggedModal;
