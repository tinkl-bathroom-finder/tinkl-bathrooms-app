import React, { useEffect, useState, createRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

function FilterByModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const openNow = useSelector((store) => store.openNow);
  const [openNow, setOpenNow] = useState(false)
  const [singleStall, setSingleStall] = useState(false);
  const [changingTable, setChangingTable] = useState(false);
  const [accessible, setAccessible] = useState(false);

  const filterObject = {
    is_open: openNow,
    is_single_stall: singleStall,
    changing_table: changingTable,
    accessible: accessible,
  };

  const requireOpen = () => {
    setOpenNow(!openNow);
    console.log("openNow:", openNow);
  };

  const requireSingleStall = () => {
    setSingleStall(!singleStall);
    console.log("singleStall required:", singleStall);
  };

  const requireChangingTable = () => {
    setChangingTable(!changingTable);
    console.log("changingTable required:", changingTable);
  };

  const requireAccessible = () => {
    setAccessible(!accessible);
    console.log("accessible required:", accessible);
  };

  const submitFilters = () => {
    console.log("filterObject:", filterObject);
    dispatch({
      type: "SAGA/SET_FILTERS",
      payload: filterObject,
    });
  };
  return (
    <>
      <Button variant="outlined" onClick={handleShow}>
        Filter results
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter by:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* filter by "open now" */}
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="open now"
              onClick={requireOpen}
            />
            {/* filter by "single stall" */}
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="single-stall"
              onClick={requireSingleStall}
            />
            {/* filter by "changing table" */}
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="changing table"
              onClick={requireChangingTable}
            />
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="wheelchair accessible"
              onClick={requireAccessible}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FilterByModal;