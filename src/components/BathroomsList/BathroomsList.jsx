import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import BathroomItem from "../BathroomItem/BathroomItem";

function BathroomsList() {
  const dispatch = useDispatch();

  const getBathrooms = () => {
    console.log("This is a test. getBathrooms is running");
    dispatch({
      type: "SAGA/FETCH_BATHROOMS",
    });
  };
  const store = useSelector((store) => store);
  const bathrooms = useSelector((store) => store.bathrooms);
  const bathroomsByDistance = useSelector((store) => store.bathroomsByDistance);
  // captures value of address typed in search bar as local state
  const [value, setValue] = useState('');
//   const [addressInput, setAddressInput] = useState('');
  const myApiKey = process.env.GOOGLE_MAPS_API_KEY;
  console.log('bathrooms: ', bathrooms)
  console.log('bathroomsByDistance: ', bathroomsByDistance)
//   const center = { lat: 50.064192, lng: -130.605469 };
// // Create a bounding box with sides ~10km away from the center point
//   const defaultBounds = {
//     north: center.lat + 0.1,
//     south: center.lat - 0.1,
//     east: center.lng + 0.1,
//     west: center.lng - 0.1,
//   };
//   const input = document.getElementById("pac-input");
//   const options = {
//     bounds: defaultBounds,
//     componentRestrictions: { country: "us" },
//     fields: ["address_components", "geometry", "icon", "name"],
//     strictBounds: false,
//   };
//   const autocomplete = new google.maps.places.Autocomplete(input, options);


  const sendLocation = () => {
    console.log("in sendLocation function");
    console.log("address input: ", value)
// converts address to url-friendly string
    const convertedAddress = value.value.description.split(" ").join("%20")
    console.log('convertedAddress:', convertedAddress)
    // dispatch({
    //   type: "SAGA/SEND_LOCATION",
    //   payload: convertedAddress
    // });
  };

  return (
    <div className="container">
      <div>
        <GooglePlacesAutocomplete apiKey="AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE"
        // {`${myApiKey}`}
        // onChange={(e) => setAddressInput(e.target.value)}
        // value={addressInput}
        selectProps={{
            value,
            onChange: setValue
        }}
        />
      </div>
      <input id="autocomplete" placeholder="Enter a place" type="text" />
      <button onClick={sendLocation}>Search nearby</button>
      <button onClick={getBathrooms}>See bathroom list</button>

<table>
    <tbody>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th>Distance</th>
          </tr>

          {bathroomsByDistance.map((bathroom) => (
            <BathroomItem key={bathroom.id} bathroom={bathroom} />
          ))}
          </tbody>
        </table>
<br />
        <table>
            <tbody>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
          </tr>

          {bathrooms.map((bathroom) => (
            <BathroomItem key={bathroom.id} bathroom={bathroom} />
          ))}
          </tbody>
        </table>
    </div>
  );
}

export default BathroomsList;
