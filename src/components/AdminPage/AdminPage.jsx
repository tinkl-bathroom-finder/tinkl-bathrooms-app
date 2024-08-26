import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ApiBathroomItem from "../ApiBathroomItem/ApiBathroomItem";
import AddAPIBathrooms from "./AddAPIBathrooms";
import DeleteBathrooms from "./DeleteBathrooms";

function AdminPage() {
  return (
    <>
      <Tabs
        defaultActiveKey="add"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="add" title="Add Bathrooms">
          <AddBathrooms />
        </Tab>
        <Tab eventKey="delete" title="Delete Bathrooms">
          <DeleteBathrooms />
        </Tab>
        <Tab eventKey="longer-tab" title="Comments">
          Tab content for Comments
        </Tab>
        <Tab eventKey="contact" title="Users">
          Tab content for Contact
        </Tab>
      </Tabs>
      <div id="api-table"></div>
    </>
  );
}

export default AdminPage;
