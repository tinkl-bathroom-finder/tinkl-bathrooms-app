import React, { useState, useRef} from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';


function BathroomsList() {
    const dispatch = useDispatch();
    const getBathrooms = () => {
        dispatch({
            type: 'SAGA/FETCH_BATHROOMS'
        })
    }
    const bathrooms = useSelector(store => store.bathrooms)
    return(
        <div className='container'>
            <div>
                <GooglePlacesAutocomplete apiKey='AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE'/>
            </div>
            <form onSubmit={getBathrooms}>
            <input id="autocomplete" placeholder="Enter a place" type="text" />
            <button type="submit">Search</button>
            </form>
            <ol>
                {bathrooms.map((bathroom) => (
                    <BathroomItem key={bathroom.id} bathroom={bathroom} />
                ))}
            </ol>

        </div>
    )
}

export default BathroomsList;