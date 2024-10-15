import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";
// require('dotenv').config();

function* getAddressCoordinates(action) {
  console.log(
    "action.payload in getAddressCoordinates Saga function:",
    action.payload
  );

  try {
    const response = yield axios.get('/search', { params: { convertedAddress: action.payload } });

    yield put({
      type: "SAGA/GET_BATHROOMS_BY_DISTANCE",
      payload: response.data.results[0].geometry.location
    });

    yield put({
      type: "SET_ADDRESS_COORDINATES",
      payload: response.data.results[0].geometry.location
    });

  } catch (error) {
    console.error('Saga function getAddressCoordinates failed', error);
  }
}

function* getPlaceID (action) {
  try {
    const response = yield axios.get('/search/', { params: { convertedAddress: action.payload } });
    yield put({
      type: "SET_PLACE_ID",
      payload: response.data.results[0].place_id
    });
    console.log("response.data.results[0].place_id: ", response.data.results[0].place_id)
    const placeID = response.data.results[0].place_id

    // checks database to see if a bathroom with that place ID is already listed
    const foundPlaceID = yield axios.get(`/search/${placeID}`)
    console.log('foundPlaceID.data', foundPlaceID.data)
    { if (foundPlaceID.data.length !== 0) {
      yield put({
      type: 'SET_REPLICATED_BATHROOM_DETAILS',
      payload: foundPlaceID.data[0]

      // if it's not listed, sends response from Places API to newBathroom reducer
    })} else { 
      console.log("response.data.results[0]: ", response.data.results[0])
      yield put({
        type: "SET_NEW_BATHROOM_DETAILS",
        payload: response.data.results[0]
      })
      
      yield put({
        type: "CLEAR_REPLICATED_BATHROOM_DETAILS"
      })
    }
  }
  } catch (error) {
    console.error('Saga function getPlaceID failed', error);
  }
}

function* setCurrentLocation(action) {
  try {
    console.log(
      "action.payload in setCurrentLocation Saga function:",
      action.payload
    );
    yield put({
      type: "SET_ADDRESS_COORDINATES",
      payload: action.payload,
    });
    yield put({
      // yells at SAGA to get bathrooms by distance based on coordinates
      type: "SAGA/GET_BATHROOMS_BY_DISTANCE",
      payload: action.payload,
    });
  } catch (error) {
    console.log("Saga function setCurrentLocation failed: ", error);
  }
}

function* clearAddBathrooms(action) {
  try {
    yield put({
      type: "CLEAR_REPLICATED_BATHROOM_DETAILS"
    });
    yield put({
      type: "CLEAR_NEW_BATHROOM_DETAILS"
    });
  } catch (error) {
    console.log("Saga function clearAddBathrooms failed: ", error);
  }
}

function* addressSaga() {
  yield takeLatest("SAGA/SEND_LOCATION", getAddressCoordinates);
  yield takeLatest("SAGA/SET_CURRENT_LOCATION", setCurrentLocation);  
  yield takeLatest("SAGA/GET_PLACE_ID", getPlaceID);  
  yield takeLatest("SAGA/CLEAR_ADD_BATHROOM", clearAddBathrooms);  
}

export default addressSaga;
