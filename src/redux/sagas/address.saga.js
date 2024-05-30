import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";
// require('dotenv').config();

function* getAddressCoordinates(action) {
  console.log(
    "action.payload in getAddressCoordinates Saga function:",
    action.payload
  );

  //TODO Move API call to server route and remove API Key
  try {
    const response = yield axios({
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCXfizt8q0KOhephD9TP55AqYdnUFNp1H0&address=${action.payload}`,
    });
    yield put({
      // yells at SAGA to get bathrooms by distance based on coordinates
      type: "SAGA/GET_BATHROOMS_BY_DISTANCE",
      payload: response.data.results[0].geometry.location,
    });
    // sends address coordinates to addressCoordinates reducer
    yield put({
      type: "SET_ADDRESS_COORDINATES",
      // location should be object with lat and lng coordinates
      payload: response.data.results[0].geometry.location,
    });
    console.log(
      "response.data...location (should be object with address info including coordinates):",
      response.data.results[0].geometry.location
    );
  } catch (error) {
    console.log("Saga function getAddressCoordinates failed: ", error);
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

function* addressSaga() {
  yield takeLatest("SAGA/SEND_LOCATION", getAddressCoordinates);
  yield takeLatest("SAGA/SET_CURRENT_LOCATION", setCurrentLocation);
}

export default addressSaga;
