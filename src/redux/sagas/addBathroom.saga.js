import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";
// require('dotenv').config();

function* getPlaceDetails (action) {
  console.log('getPlaceDetails action.payload:', action.payload.placeID);
    try {
        // makes a get request call to the Google Place Details API to get info for bathroom to add
        const response = yield axios.get('/add', { params: { placeID: action.payload.placeID } });
        // sets new bathrooms reducer with details
        // yield put({
        //   type: 'SET_NEW_BATHROOM_DETAILS',
        //   payload: response.data.result
        // })
        console.log('response in saga: ', response.data);
        //axios post route to insert bathroom record
        yield axios.post(`/add/add`, {
          bathroomToAdd: action.payload,
          bathroomHours: response.data
        })
      } catch (error) {
        console.log('Error with add bathroom saga function', error)
      }
}

// function* clearPlaceDetails (action) {
//   try {
//       // clears new bathroom reducer
//       yield put({
//         type: 'CLEAR_NEW_BATHROOM_DETAILS'
//       })
//     } catch (error) {
//       console.log('Clear place details failed:', error)
//     }
// }
  
  function* addBathroom() { 
    yield takeLatest("SAGA/GET_PLACE_DETAILS", getPlaceDetails);
    // yield takeLatest("SAGA/CLEAR_PLACE_DETAILS", clearPlaceDetails)  
  }
  
  export default addBathroom;