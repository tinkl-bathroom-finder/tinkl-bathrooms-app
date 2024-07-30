import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetches list of bathrooms according (eventually) to search query parameters
function* fetchBathrooms() {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/bathrooms'
      })
      yield put({
        type: 'SET_BATHROOMS',
        payload: response.data
      })
    } catch (error) {
      console.log('Saga function fetchBathrooms failed: ', error)
    }
  }
  function* fetchBathroomsGeocoding() {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/api'
      })
    } catch (error) {
      console.log('Saga function fetchBathroomsGeocoding failed: ', error)
    }
  }

function* fetchBathroomsPlaces(action) {
  try {
    const response = yield axios.get('/api/places', { 
      params: {
        minId: action.payload.minId, 
        maxId: action.payload.maxId
      }
    })
  } catch (error) {
    console.log('Saga function fetchBathroomsPlaces failed: ', error)
  }
}

function* bathroomSaga() {
    yield takeLatest('SAGA/FETCH_BATHROOMS', fetchBathrooms);
    yield takeLatest('SAGA/FETCH_BATHROOMS_GEOCODING', fetchBathroomsGeocoding);
    yield takeLatest('SAGA/FETCH_BATHROOMS_PLACES', fetchBathroomsPlaces);
}
  
export default bathroomSaga;