import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

function ApiBathroomItem({ bathroom, bathroomArray }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [minIdNumber, setMinIdNumber] = useState(0);
  const [maxIdNumber, setMaxIdNumber] = useState(0);
  const user = useSelector((store) => store.user);

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

  const idRange = {
    minId: minIdNumber,
    maxId: maxIdNumber
  }

  // sets minimum restroom_id number for places API get request
  const minimumId = (e) => {
    setMinIdNumber(e.target.value);
  }

  // sets maximum restroom_id number for places API get request
  const maximumId = (e) => {
    setMaxIdNumber(e.target.value);
  }

  const geocodeApiRequest = () => {
    dispatch({
      type: "SAGA/FETCH_BATHROOMS_GEOCODING",
    });
  }

  const placesApiRequest = () => {
    console.log('idRange: ', idRange)
    dispatch({
      type: "SAGA/FETCH_BATHROOMS_PLACES",
      payload: idRange
    });
  }

  return (
    // <tr>
    //   <td>
    //     <input
    //       type="checkbox"
    //       id="selectAll"
    //       name="selectAll"
    //       value="Select bathroom to add"
    //       checked={isChecked}
    //       onChange={(e) => handleOnChange(e)}
    //     />
    //     <label htmlFor="selectAll">Select bathroom</label>
    //   </td>
    //   <td></td>
    //   <td>{bathroom.id}</td>
    //   <td>{bathroom.name || ""}</td>
    //   <td>{bathroom.street || ""}</td>
    //   <td>{bathroom.city || ""}</td>
    //   <td>{bathroom.state || ""}</td>
    //   <td>{bathroom.directions || ""}</td>
    //   <td>{bathroom.comment || ""}</td>
    //   <td>{bathroom.upvote || 0}</td>
    //   <td>{bathroom.downvote || 0}</td>
    //   <td>{bathroom.unisex === true ? "yes" : "no"}</td>
    //   <td>{bathroom.accessible === true ? "yes" : "no"}</td>
    //   <td>{bathroom.changing_table === true ? "yes" : "no"}</td>
    //   <td>{bathroom.latitude || ""}</td>
    //   <td>{bathroom.longitude || ""}</td>
    //   <td>{bathroom.created_at || ""}</td>
    //   <td>{bathroom.updated_at || ""}</td>
    //   <td>{bathroom.country || ""}</td>
    // </tr>
    <>
    { user.is_admin &&
        <>
          <h2>Geocoding API</h2>
          <button type="submit" onClick={geocodeApiRequest}>click here to run the geocoding api</button>
          <br />
          <h2>Places API</h2>
          <input placeholder="Enter minimum restroom_id number" onChange={(e) => minimumId(e)} />
          <input placeholder="Enter maximum restroom_id number"
            onChange={(e) => maximumId(e)} />
          <button type="submit" onClick={placesApiRequest}>click here to run the places api</button>
        </>
    }

    {!user.is_admin &&
      <h2 style={{ margin: '10px'}}>User not authorized. Please contact administrator</h2>
  }
  </>
  );
}

export default ApiBathroomItem;
