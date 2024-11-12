import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal } from "react-bootstrap";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { PropaneRounded } from "@mui/icons-material";


function MarkAsFlaggedModal(props) {

  // props
  const flaggedBathroom = props.details
  const editTextDetails = props.editTextDetails
  const editCheckDetails = props.editCheckDetails

  // submission of bathroom edits
  const dispatch = useDispatch()
  const submitPopup = () => {
    event.preventDefault()
    // closes modal
    // props.setModal2Show(false);

    dispatch({
      type: 'SAGA/FLAG_BATHROOM',
      payload: flaggedBathroom
    })

    // popup window "confirming" submission
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
                disabled={flaggedBathroom.is_closed}
                value={flaggedBathroom.name}
                onChange={() => editTextDetails(event, 'name')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control 
                type="text" 
                disabled={flaggedBathroom.is_closed}
                value={flaggedBathroom.street} 
                onChange={() => editTextDetails(event, 'street')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text" 
                disabled={flaggedBathroom.is_closed}
                value={flaggedBathroom.city} 
                onChange={() => editTextDetails(event, 'city')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control 
                type="text" 
                disabled={flaggedBathroom.is_closed}
                value={flaggedBathroom.state} 
                onChange={() => editTextDetails(event, 'state')}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Gender neutral/all-gender"
              disabled={flaggedBathroom.is_closed}
              defaultChecked={flaggedBathroom.unisex}
              onChange={() => editCheckDetails('unisex')}
            />

            <Form.Check
              type="checkbox"
              label="Wheelchair accessible"
              disabled={flaggedBathroom.is_closed}
              defaultChecked={flaggedBathroom.accessible}
              onChange={() => editCheckDetails('accessible')}
            />

            <Form.Check
              type="checkbox"
              label="Changing table"
              disabled={flaggedBathroom.is_closed}
              defaultChecked={flaggedBathroom.changing_table}
              onChange={() => editCheckDetails('changing_table')}
            />

            <Form.Check
              type="checkbox"
              label="Menstrual Products"
              disabled={flaggedBathroom.is_closed}
              defaultChecked={flaggedBathroom.menstrual_products}
              onChange={() => editCheckDetails('menstrual_products')}
            />

            <Form.Check
              type="checkbox"
              label="Single stall"
              disabled={flaggedBathroom.is_closed}
              defaultChecked={flaggedBathroom.single_stall}
              onChange={() => editCheckDetails('is_single_stall')}
            />

            <Form.Group>
              <Form.Label>Other:</Form.Label>
              <Form.Control 
                type="text" 
                disabled={flaggedBathroom.is_closed}
                value={flaggedBathroom.other}
                onChange={() => editTextDetails(event, 'other')}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Location is permanently closed"
              defaultChecked={false}
              onClick={() => editCheckDetails('is_closed')}
            />

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" sx={{ mr: 2 }} data-bs-dismiss="modal" onClick={() => props.setModal2Show(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => submitPopup()}>Submit changes</Button>
        </Modal.Footer>
      </Box>
    </Modal>
  );
}

export default MarkAsFlaggedModal;
