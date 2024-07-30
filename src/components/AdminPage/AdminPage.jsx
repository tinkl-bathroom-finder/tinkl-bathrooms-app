import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ApiBathroomItem from "../ApiBathroomItem/ApiBathroomItem";
import AddBathrooms from "./AddBathrooms";
import DeleteBathrooms from "./DeleteBathrooms";
import AdminComments from "./AdminComments";
import AdminUsers from "./AdminUsers";

function AdminPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%' , p: '10px'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="admin tabs">
            <Tab label="Approve bathrooms" {...a11yProps(0)} />
            <Tab label="Delete bathrooms" {...a11yProps(1)} />
            <Tab label="Flagged bathrooms" {...a11yProps(2)} />
            <Tab label="Comments" {...a11yProps(3)} />
            <Tab label="Users" {...a11yProps(4)} />
            <Tab label="Places API" {...a11yProps(5)} />
          </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
          <AddBathrooms />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <DeleteBathrooms />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <AdminComments />
        </TabPanel>

        <TabPanel value={value} index={4}>
          <AdminUsers />
        </TabPanel>

        <TabPanel value={value} index={5}>
          <ApiBathroomItem />
        </TabPanel>

      </Box>
    </div>
  );
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

/**
 * @param {number} index
 */
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default AdminPage;
