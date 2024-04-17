import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

function MarkAsFlaggedModal(props){
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
            Here's what we have:
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" defaultValue={props.details.name} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" defaultValue={props.details.street + ", " + props.details.city + ", " + props.details.state} />
                </Form.Group>

                <Form.Check 
                type="checkbox"
                defaultChecked={props.details.accessible}
                label="Wheelchair accessible"
                />

                <Form.Check 
                type="checkbox"
                defaultChecked={props.details.changing_table}
                label="Changing table"
                />

                <Form.Check 
                type="checkbox"
                defaultChecked={props.details.unisex}
                label="Gender neutral/all-gender"
                />

                <Form.Check 
                type="checkbox"
                defaultChecked={props.details.single_stall}
                label="Single stall"
                />

            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="outlined" sx={{mr: 2}}>Cancel</Button> 
                <Button variant="contained">Submit</Button> 
          </Modal.Footer>
        </Box>
      </Modal>
  );
}

export default MarkAsFlaggedModal;