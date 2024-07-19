import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";


export const AutoCompleteBar = () => {

    // captures value of address typed in search bar as local state
    const [searchBarAddress, setSearchBarAddress] = useState("");

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
            // try {
            //   console.log('Converted Address', convertedAddress)
            setOrigin(convertedAddress);
            dispatch({
                type: "SAGA/SEND_LOCATION",
                payload: convertedAddress,
            });
            // } catch (err) {
            //   console.log("Error sending location: ", err);
            // }
        }
    }

    // Runs when search menu is closed, allowing whatever has been selected to be sent to sendLocation()
    const menuClosed = () => {
        if (searchBarAddress === "") {
            console.log("Search bar is empty");
        } else {
            sendLocation();
        }
    };

    // Ensures searchBarAddress is set in state before executing sendLocation()
    useEffect(() => {
        //if (searchBarAddress !== '') {
        menuClosed();
    }, [searchBarAddress]);

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
        <GooglePlacesAutocomplete
            selectProps={{
                className: "searchBar", // Provides the component with a class for styling
                isClearable: true, // Allows the textbox to be emptied with X
                onBlur: () => menuClosed(), // Triggers menuClosed() when clicking off of the textbox
                onMenuOpen: () => menuOpened(), // Triggers textbox to clear when clicking on it
                value: searchBarAddress,
                onChange: handleChange,
                placeholder: "Enter an address", // Sets the placeholder for textbox
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
            // biases autocomplete search results to locations near IP address
            ipbias
        />
    )
}
