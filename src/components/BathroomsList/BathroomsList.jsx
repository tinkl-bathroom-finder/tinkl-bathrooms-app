import React, { useEffect } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import BathroomItem from '../BathroomItem/BathroomItem'


function BathroomsList() {
    const dispatch = useDispatch();
    const getBathrooms = (event) => {
        event.preventDefault();
        useEffect(() => {
        dispatch({
            type: 'SAGA/FETCH_BATHROOMS'
        })
        }, []);

    }
    const store = useSelector(store => store)
    const bathrooms = useSelector(store => store.bathrooms)
    console.log('bathrooms: ', bathrooms)
    console.log('store:', store)
    return(
        <div className='container'>
            <div>
                <GooglePlacesAutocomplete apiKey='AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE'/>
            </div>
            <form onSubmit={getBathrooms(event)}>
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