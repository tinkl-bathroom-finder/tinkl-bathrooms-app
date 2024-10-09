import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getPlaceDetails (action) {
  console.log('getPlaceDetails action.payload:', action.payload.placeID);
    try {
        // makes a get request call to the Google Place Details API to get info for bathroom to add
        const response = yield axios.get('/add', { params: { placeID: action.payload.placeID } });
        console.log('places ID response in saga: ', response.data);
        //axios post route to insert bathroom record
        yield axios.post(`/add/add`, {
          bathroomToAdd: action.payload,
          bathroomHours: response.data
        })
        Swal.fire({
          title: "Thank you!",
          text: "Bathroom received!",
          icon: "success"
      })
      } catch (error) {
        console.log('Error with add bathroom saga function', error)
        Swal.fire({
          title: "Oh no!",
          text: "Something went wrong. Please try again later.",
          icon: "error"
      })
      }
}

function* getBathroomsToApprove () {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/add/approve'
    })
    yield put({
      type: 'SET_BATHROOMS_TO_APPROVE',
      payload: response.data
    })
  } catch (error) {
    console.log('Saga function getBathroomsToApprove failed: ', error)
  }
}

  function* addBathroom() { 
    yield takeLatest("SAGA/GET_PLACE_DETAILS", getPlaceDetails);
    yield takeLatest("SAGA/GET_BATHROOMS_TO_APPROVE", getBathroomsToApprove)
  }
  
  export default addBathroom;