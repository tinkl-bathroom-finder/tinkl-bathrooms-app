import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ApiBathroomItem from "../ApiBathroomItem/ApiBathroomItem";
import AddBathroom from "../Nav/AddBathroom";
import ApproveBathrooms from "./ApproveBathrooms";
import DeleteBathrooms from "./DeleteBathrooms";
import AdminUsers from "./AdminUsers";
import FlaggedBathrooms from "./FlaggedBathrooms";
import AdminComments from "./AdminComments";

function AdminPage() {
  return (
    <>
      <Tabs
        defaultActiveKey="add"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="approve" title="Approve Bathrooms">
          <ApproveBathrooms />
        </Tab>
        <Tab eventKey="flagged" title="Flagged Bathrooms">
          <FlaggedBathrooms />
        </Tab>
        <Tab eventKey="feedback" title="User Feedback">
          <AdminComments />
        </Tab>
        <Tab eventKey="users" title="Users">
          <AdminUsers/>
        </Tab>
      </Tabs>
      {/* <div id="api-table"></div> */}
    </>
  );
}

export default AdminPage;
