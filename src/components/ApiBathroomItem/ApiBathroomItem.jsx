import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ApiBathroomItem({ bathroom, bathroomArray }) {
  const history = useHistory();

  const goToDetails = () => {
    // maybe add a function to set the details before navigating
    // to the bathroom details page
    history.push(`/bathrooms/${bathroom.id}`);
  };

  const [isChecked, setIsChecked] = useState(false);
  // const [addBathroomArray, setAddBathroomArray] = useState([]);

  const handleOnChange = (e) => {
    setIsChecked(!isChecked);
    bathroomArray.push({
        id: bathroom.id,
        name: bathroom.name,
        street: bathroom.street,
        city: bathroom.city,
        state: bathroom.state,
        upvote: bathroom.upvote,
        downvote: bathroom.downvote,
        unisex: bathroom.unisex,
        accessible: bathroom.accessible,
        changing_table: bathroom.changing_table,
        latitude: bathroom.latitude,
        longitude: bathroom.longitude,
        created_at: bathroom.created_at,
        updated_at: bathroom.updated_at,
        country: bathroom.country
      });
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          id="selectAll"
          name="selectAll"
          value="Select bathroom to add"
          checked={isChecked}
          onChange={(e) => handleOnChange(e)}
        />
        <label htmlFor="selectAll">Select bathroom</label>
      </td>
      <td></td>
      <td>{bathroom.id}</td>
      <td>{bathroom.name || ""}</td>
      <td>{bathroom.street || ""}</td>
      <td>{bathroom.city || ""}</td>
      <td>{bathroom.state || ""}</td>
      <td>{bathroom.directions || ""}</td>
      <td>{bathroom.comment || ""}</td>
      <td>{bathroom.upvote || 0}</td>
      <td>{bathroom.downvote || 0}</td>
      <td>{bathroom.unisex === true ? "yes" : "no"}</td>
      <td>{bathroom.accessible === true ? "yes" : "no"}</td>
      <td>{bathroom.changing_table === true ? "yes" : "no"}</td>
      <td>{bathroom.latitude || ""}</td>
      <td>{bathroom.longitude || ""}</td>
      <td>{bathroom.created_at || ""}</td>
      <td>{bathroom.updated_at || ""}</td>
      <td>{bathroom.country || ""}</td>
    </tr>
  );
}

export default ApiBathroomItem;
