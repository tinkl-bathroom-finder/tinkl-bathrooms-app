import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getBathroomsByDistance(action){
    console.log('action.payload.lat:', action.payload.lat)
    try {
      const response = yield axios({
        method: 'GET',
        url: `/distance/?lat=${action.payload.lat}&lng=${action.payload.lng}`
      })
      yield put({
        // need to call this in the address saga once we have address coordinates
        type: 'SET_BATHROOMS_BY_DISTANCE',
        payload: response.data
      })
    } catch (error) {
      console.log('Saga function getBathroomsByDistance failed: ', error)
    }
  }


function* bathroomsByDistanceSaga() {
    yield takeLatest('SAGA/GET_BATHROOMS_BY_DISTANCE', getBathroomsByDistance)
  }

  export default bathroomsByDistanceSaga;