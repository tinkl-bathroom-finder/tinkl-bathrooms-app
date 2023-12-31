import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


function BathroomsList() {
const Component = () => {
    <div>
        <GooglePlacesAutocomplete apiKey='AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE'/>
    </div>
}
    return(
        <div className='container'>
            <input id="autocomplete" placeholder="Enter a place" type="text" />
            <button>Search</button>
            <ol>
                <li>First Bathroom Info Here</li>
            </ol>
            <Component />

        </div>
    )
}

export default BathroomsList;