import React, { useEffect } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import BathroomItem from '../BathroomItem/BathroomItem'


function BathroomsList() {
    const dispatch = useDispatch();
    const getBathrooms = () => {
        console.log('This is a test. getBathrooms is running')
        
        dispatch({
            type: 'SAGA/FETCH_BATHROOMS'
        })

    }
    const store = useSelector(store => store)
    const bathrooms = useSelector(store => store.bathrooms)
    // console.log('bathrooms: ', bathrooms)
    // console.log('store:', store)

    const sendLocation = () => {
        console.log('in sendLocation function')
        dispatch({
            type: 'SAGA/SEND_LOCATION'
        })
    }
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 bathrooms are appearing ordered by distance!!! They are an array of bathroom objects with only two properties right now, id and distance => need to loop through and map each bathroom object and render it in the table. Could replace "see bathroom list" with search nearby, just with default parameters? Or conditionally render one or the other. It would be nice to not have distances show unless you'd entered a location
    const bathroomsByDistance = useSelector(store => store.bathroomsByDistance)
    console.log('bathroomsByDistance:', bathroomsByDistance)

    
    return(
        <div className='container'>
            <div>
                <GooglePlacesAutocomplete apiKey='AIzaSyBEYEcOGj237bE2zG78LTaQpUplQITQxpE'/>
            </div>
            {/* When I tried to make getBathrooms into an anonymous function, it errored out, saying:
            "Invalid hook call. Hooks can only be called inside of the body of a function component."" */}
            {/* <input id="autocomplete" placeholder="Enter a place" type="text" /> */}
            <button onClick={sendLocation}>Search nearby</button>
            <button onClick={getBathrooms}>See bathroom list</button>
            <table>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Street</th>
                    <th>City</th>
                </tr>
            
                
                    {bathrooms.map((bathroom) => (
                      <BathroomItem 
                      key={bathroom.id}   
                      bathroom={bathroom} />
                ))}
</table>
        </div>
    )
}

export default BathroomsList;