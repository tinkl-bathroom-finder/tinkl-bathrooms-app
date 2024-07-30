import * as React from 'react';

import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

function MarkAsFlaggedModal(props){
  const dispatch = useDispatch();
  const params = useParams();

    let [isClosed, setIsClosed] = useState(false);
    let [name, setName] = useState(props.details.name);
    let [address, setAddress] = useState(props.details.street);
    let [isAccessible, setIsAccessible] = useState(props.details.accessible);
    let [isSingleStall, setIsSingleStall] = useState(props.details.isSingleStall);
    let [isUnisex, setIsUnisex] = useState(props.details.unisex);
    let [hasChangingTable, setHasChangingTable] = useState(props.details.changing_table);
    let [otherComments, setOtherComments] = useState("");
    let userId = useSelector((store) => store.user.id);

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

const handleInputChange = (e, setField) => {
  e.preventDefault();
  setField(e.target.value)
}

// 🔥🔥🔥 not sure how checkbox values are captured, need to check on this
const handleCheckboxChange = (value, setAmenity) => {
  console.log("value: ", value)
  console.log("setAmenity: ", setAmenity)
  setAmenity(e.target.value)
}

    const submitChanges = (e) => {
      e.preventDefault();
      console.log('')
      dispatch({
        type: 'SAGA/FLAG_BATHROOM',
        payload: {
          user_id: userId,
          name: name,
          bathroomId: params.id,
          address: address,
          isAccessible: isAccessible,
          isSingleStall: isSingleStall,
          isUnisex: isUnisex,
          hasChangingTable: hasChangingTable,
          isClosed: isClosed,
          otherComments: otherComments
        }
      })
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
                    <Form.Control type="text" onChange={(e) => setOtherComments(e.target.value)}/>
                </Form.Group>
                
            <Form.Check 
                type="checkbox"
                label="Location is permanently closed"
                onClick={() => setIsClosed(!isClosed)}
                />

            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button 
            variant="outlined" 
            sx={{mr: 2}} 
            data-bs-dismiss="modal" 
            onClick={() => props.setModal2Show(false)}>Cancel
            </Button> 

                <Button 
                  variant="contained"
                  type="submit"
                  onClick={(e) => submitChanges(e)}>Submit changes
                  </Button> 
          </Modal.Footer>
        </Box>
      </Modal>
  );
}

export default MarkAsFlaggedModal;