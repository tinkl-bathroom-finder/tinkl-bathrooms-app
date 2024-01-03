import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getBathroomsByDistance(){
    try {
      const response = yield axios({
        method: 'GET',
        url: '/distance'
      })
      yield put({
        type: 'SET_BATHROOMS_BY_DISTANCE',
        payload: response.data
      })
    } catch (error) {
      console.log('Saga function getBathroomsByDistance failed: ', error)
    }
  }


function* addressSaga() {
    yield takeLatest('SAGA/SEND_LOCATION', getBathroomsByDistance)
  }

  export default addressSaga;