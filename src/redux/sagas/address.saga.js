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
