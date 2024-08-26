
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Button } from "@mui/material";
import AddBathroomModal from "./AddBathroomModal";

const AddBathroom = () => {
  const dispatch = useDispatch();
  const placeID = useSelector((store) => store.placeID);
  const replicatedBathroom = useSelector((store) => store.replicatedBathroom);
  const newBathroom = useSelector((store) => store.newBathroom);
  let userId = useSelector((store) => store.user.id);
  const history = useHistory();

    // React state for AddBathroomModal
    const [modal2Show, setModal2Show] = useState(false);

// captures value of address typed in search bar as local state
  const [searchBarAddress, setSearchBarAddress] = useState("");

  const clickAddBathroom = () => {
    if (userId) {
      dispatch({
        type: "SAGA/GET_PLACE_DETAILS",
        payload: placeID,
      });
      setModal2Show(true);
    } else
      Swal.fire({
        title: "Hey, stranger.",
        imageUrl: "https://media.giphy.com/media/HULqwwF5tWKznstIEE/giphy.gif",
        imageWidth: 360,
        imageHeight: 203,
        imageAlt: "Goat unicorn",
        text: "Come here often? Log in to add a bathroom!",
        confirmButtonText: "Log in",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
  };

  const goToDetails = (id) => {
    // maybe add a function to set the details before navigating
    // to the bathroom details page
      history.push(`/bathrooms/${id}`)
    }

   // sends address types into Autocomplete box to server to get bathrooms list
   const sendLocation = () => {
    // Ensures that sendLocation isn't triggered when search box is cleared
    if (searchBarAddress === null) {
      return;
    }
    // biome-ignore lint/style/noUselessElse: <explanation>
    else if (searchBarAddress !== "") {
      console.log("searchBarAddress: ", searchBarAddress);
      // converts address to url-friendly string
      const convertedAddress = searchBarAddress.value.description
        .split(" ")
        .join("%20");

      dispatch({
        type: "SAGA/GET_PLACE_ID",
        payload: convertedAddress,
      });
    }
  };
  // Runs when search menu is closed, allowing whatever has been selected to be sent to sendLocation()
  const menuClosed = () => {
    if (searchBarAddress === "") {
      console.log("Search bar is empty");
    } else {
      sendLocation();
    }
  };
  // Runs when search menu is opened, emptying the menu of text
  const menuOpened = () => {
    if (searchBarAddress !== "") {
      setSearchBarAddress("");
    }
  };

  const handleChange = (address) => {
    setSearchBarAddress(address);
  }

    return (
        <>
        <h1>Add bathroom</h1>
        <GooglePlacesAutocomplete
          selectProps={{
            className: "searchBar", // Provides the component with a class for styling
            isClearable: true, // Allows the textbox to be emptied with X
            onBlur: () => menuClosed(), // Triggers menuClosed() when clicking off of the textbox
            onMenuOpen: () => menuOpened(), // Triggers textbox to clear when clicking on it
            value: searchBarAddress,
            onChange: handleChange,
            placeholder: "Start typing an address or place name...", // Sets the placeholder for textbox
            styles: {
              input: (provided) => ({
                ...provided,
                // text color in searchbar
                color: "black",
              }),
              // Removes highlight on hover
              option: (provided) => ({
                ...provided,
                // text color for dropdown menu items
                color: "black",
                // background color for dropdown menu items (set to black but it is modified by menu styling below to make it transparent)
                background: "#00000000",
              }),
              // 👇 I don't know what this does TBH. -ES 4.24.24
              singleValue: (provided) => ({
                ...provided,
                // color: "blue",
                // background:"black"
              }),
              // this is the searchbar itself
              control: (provided) => ({
                ...provided,
                width: "100%",
                // background: 'rgba(255, 255, 255, 0.25)',
                border: "1px solid rgba(255, 255, 255, 0.41)",
                backdropFilter: "blur(50px)",
                borderRadius: "20px",
              }),
              // styling for dropdown menu
              menu: (provided) => ({
                ...provided,
                width: "100%",
                // transparent rainbow gradient 🤓
                background:
                  "linear-gradient(0deg, rgba(236,212,255,0.25) 0%, rgba(214,200,251,0.25) 14%, rgba(194,214,247,0.25) 23%, rgba(201,241,225,0.25) 35%, rgba(209,244,191,0.25) 48%, rgba(246,237,171,0.25) 60%, rgba(255,230,175,0.25) 73%, rgba(255,208,166,0.25) 87%, rgba(255,166,166,0.25004595588235294) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.41)",
                backdropFilter: "blur(50px)",
                borderRadius: "12px",
              }),
              container: (provided) => ({
                ...provided,
              }),
            },
          }}
        />
{replicatedBathroom ? <div>
    <p>Do you mean:</p>
        <h4>{replicatedBathroom.name}</h4>
        <h4>{replicatedBathroom.street}</h4>
        <Button variant="contained" onClick={() => goToDetails(replicatedBathroom.id)}>Leave a Review instead</Button>
</div> : <div>
    {newBathroom ? <div>
    {/* <h4>{searchBarAddress}</h4> */}
    <h4>{newBathroom.formatted_address}</h4>
    <p>Is this the right address?</p>
    <Button variant="contained" onClick={() => clickAddBathroom()}>Add bathroom</Button></div> : ""}
    </div>}
    <AddBathroomModal 
        show={modal2Show}
        setModal2Show={setModal2Show}
        onHide={() => setModal2Show(false)}
        aria-labelledby="add-bathroom-modal"
        aria-describedby="Form to add a new bathroom to the database."
        details={newBathroom}/>
        </>
    )
}

export default AddBathroom;