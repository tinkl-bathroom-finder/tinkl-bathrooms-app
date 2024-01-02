import { put, takeLatest } from 'redux-saga/effects';
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
// fetches bathroom details for clicked bathroom
  function* fetchBathroomDetails (action) {
    try {
      const bathroomId = action.payload
      const response = yield axios({
        method: 'GET',
        url: `/bathrooms/${bathroomId}`
      })
      
      const theBathroom = response.data
      console.log('theBathroom, aka response.data', theBathroom)
      yield put({
        type: 'SET_BATHROOM_DETAILS',
        payload: theBathroom
      })
    } catch (err) {
      console.log('Saga function fetchBathrooms failed:', err)
    }

  }

function* bathroomSaga() {
    yield takeLatest('SAGA/FETCH_BATHROOMS', fetchBathrooms);
    yield takeLatest('SAGA/FETCH_BATHROOM_DETAILS', fetchBathroomDetails);
  }
  
export default bathroomSaga;