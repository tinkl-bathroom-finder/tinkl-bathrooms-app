import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

function MarkAsFlaggedModal(props){
    let [isClosed, setIsClosed] = useState(false);

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

    const submitPopup = () => {
      // closes modal
      props.setModal2Show(false);
      // popup window "confirming" submission
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
                    <Form.Control type="text" defaultValue={props.details.name} disabled={isClosed}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" defaultValue={`${props.details.street}, ${props.details.city}, ${props.details.state}`} disabled={isClosed}/>
                </Form.Group>

                <Form.Check 
                type="checkbox"
                defaultChecked={props.details.accessible}
                label="Wheelchair accessible"
                disabled={isClosed}
                />

                <Form.Check 
                type="checkbox"
                defaultChecked={props.details.changing_table}
                label="Changing table"
                disabled={isClosed}
                />

                <Form.Check 
                type="checkbox"
                defaultChecked={props.details.unisex}
                label="Gender neutral/all-gender"
                disabled={isClosed}
                />

                <Form.Check 
                type="checkbox"
                defaultChecked={props.details.single_stall}
                label="Single stall"
                disabled={isClosed}
                />
                <Form.Group>
                    <Form.Label>Other:</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
                
            <Form.Check 
                type="checkbox"
                label="Location is permanently closed"
                onClick={() => setIsClosed(!isClosed)}
                />

            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="outlined" sx={{mr: 2}} data-bs-dismiss="modal" onClick={() => props.setModal2Show(false)}>Cancel</Button> 
                <Button variant="contained" onClick={() => submitPopup()}>Submit changes</Button> 
          </Modal.Footer>
        </Box>
      </Modal>
  );
}

export default MarkAsFlaggedModal;