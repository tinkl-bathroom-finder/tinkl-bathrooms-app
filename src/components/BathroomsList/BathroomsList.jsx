import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import BathroomItem from "../BathroomItem/BathroomItem";
// need to require dot env if we use it I believe

function BathroomsList() {
  const dispatch = useDispatch();

  const store = useSelector((store) => store);
  const bathrooms = useSelector((store) => store.bathrooms);
  const bathroomsByDistance = useSelector((store) => store.bathroomsByDistance);
  const addressCoordinates = useSelector((store) => store.addressCoordinates);
  // captures value of address typed in search bar as local state
  const [value, setValue] = useState('');
  const myApiKey = process.env.GOOGLE_MAPS_API_KEY;
//   console.log('bathrooms: ', bathrooms)
//   console.log('bathroomsByDistance: ', bathroomsByDistance)

  const sendLocation = (e) => {
// converts address to url-friendly string
    e.preventDefault()
    const convertedAddress = value.value.description.split(" ").join("%20")
    console.log('convertedAddress:', convertedAddress)
    dispatch({
      type: "SAGA/SEND_LOCATION",
      payload: convertedAddress
    });
    console.log('addressCoordinates:', addressCoordinates)
  };

  const getBathrooms = () => {
    console.log("This is a test. getBathrooms is running");
    dispatch({
      type: "SAGA/FETCH_BATHROOMS",
    });
  };

  return (
    <div className="container">
      <form onSubmit={(e) => sendLocation(e)}>
        <GooglePlacesAutocomplete apiKey="AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE"
        // onChange={(e) => setAddressInput(e.target.value)}
        // value={addressInput}
        selectProps={{
            value,
            onChange: setValue
        }}
        />
      <button type="submit" onClick={(e) => sendLocation(e)}>Search nearby</button>
      <button onClick={getBathrooms}>See all bathrooms</button>
      </form>

<table>
    <thead>
        <tr>
            <th></th>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th>Distance</th>
            </tr>
          </thead>
<tbody>
          {bathroomsByDistance.map((bathroom) => (
            <BathroomItem key={bathroom.id} bathroom={bathroom} />
          ))}
          </tbody>
        </table>
<br />
        <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th></th>
          </tr>
          </thead>
    <tbody>
          {bathrooms.map((bathroom) => (
            <BathroomItem key={bathroom.id} bathroom={bathroom} />
          ))}
          </tbody>
        </table>
    </div>
  );
}

export default BathroomsList;
