import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";
// require('dotenv').config();

function* getPlaceDetails (action) {
    try {
        // makes a get request call to the Google Place Details API to get info for bathroom to add
        const response = yield axios({
          method: 'GET',
          url: `/add/${action.payload}`
        })
        // sets api bathrooms reducer with array of returned bathrooms
        yield put({
          type: 'SET_NEW_BATHROOM_DETAILS',
          payload: response.data.results[0]
        })
      } catch (error) {
        console.log('API get request failed:', error)
      }
}
  
  function* addBathroom() { 
    yield takeLatest("SAGA/GET_PLACE_DETAILS", getPlaceDetails);  
  }
  
  export default addBathroom;