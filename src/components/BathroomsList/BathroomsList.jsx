import React, { useState, useRef} from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


function BathroomsList() {

    return(
        <div className='container'>
            <div>
                <GooglePlacesAutocomplete apiKey='AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE'/>
            </div>
            <input id="autocomplete" placeholder="Enter a place" type="text" />
            <button>Search</button>
            <ol>
                <li>First Bathroom Info Here</li>
            </ol>

        </div>
    )
}

export default BathroomsList;