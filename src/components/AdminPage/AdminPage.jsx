import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';



function AdminPage () {
    const dispatch = useDispatch();
    const [perPage, setPerPage] = useState('')
    const [pageNumber, setPageNumber] = useState('')

    const bathroomsPerPage = (e) => {
        setPerPage(e.target.value)
    }

    const pageNumberFunction = (e) => {
        setPageNumber(e.target.value)
    }

    const loadBathrooms = () => {
        console.log('payload:', {perPage, pageNumber})
        dispatch({
            type: "SAGA/LOAD_BATHROOMS_FROM_API",
            payload: {perPage, pageNumber}
        })
    }

    return (
        <Tabs
          defaultActiveKey="home"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="home" title="Home">
            <Form onSubmit={loadBathrooms}>
            <h3>Load bathrooms from Refuge API</h3>
            <input placeholder="Bathrooms per page" onChange={(e) => bathroomsPerPage(e)}></input>
            <input placeholder="Page number" onChange={(e) => pageNumberFunction(e)}></input>
            <Button type="submit">Submit</Button>
            </Form>
          </Tab>
          <Tab eventKey="bathrooms" title="Bathrooms">
            Tab content for Bathrooms
          </Tab>
          <Tab eventKey="longer-tab" title="Comments">
            Tab content for Comments
          </Tab>
          <Tab eventKey="contact" title="Users">
            Tab content for Contact
          </Tab>
        </Tabs>
        // <Table>

        // </Table>
      );
}

export default AdminPage;