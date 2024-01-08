import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ApiBathroomItem({ bathroom }) {

    const history = useHistory()
  
    const goToDetails = () => {
    // maybe add a function to set the details before navigating
    // to the bathroom details page
      history.push(`/bathrooms/${bathroom.id}`)
    }
  
  
    return (
    <tr>
        <td><Button onClick={goToDetails}>View single bathroom</Button>
        </td>
        <td>{bathroom.id}</td>
        <td>{bathroom.name || ''}</td>
        <td>{bathroom.street || ''}</td> 
        <td>{bathroom.city || ''}</td>
        <td>{bathroom.state || ''}</td>
        <td>{bathroom.directions || ''}</td>
        <td>{bathroom.comment || ''}</td>
        <td>{bathroom.upvote || 0}</td>
        <td>{bathroom.downvote || 0}</td>
        <td>{bathroom.unisex === true ? 'yes' : 'no'}</td>
        <td>{bathroom.accessible === true ? 'yes' : 'no'}</td>
        <td>{bathroom.changing_table === true ? 'yes' : 'no'}</td>
        <td>{bathroom.latitude || ''}</td>
        <td>{bathroom.longitude || ''}</td>
        <td>{bathroom.created_at || ''}</td>
        <td>{bathroom.updated_at || ''}</td>
        <td>{bathroom.country || ''}</td>
        </tr>)
  }
  
  
  export default ApiBathroomItem