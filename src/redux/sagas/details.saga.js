import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetches bathroom details for clicked bathroom
function* fetchBathroomDetails (action) {
    try {
      const bathroomId = action.payload
      console.log('bathroomId in details saga: ', bathroomId)
      const response = yield axios({
        method: 'GET',
        url: `/details/${bathroomId}`
      })
      
      const theBathroom = response.data
      console.log('theBathroom, aka response.data from details saga', theBathroom)
      yield put({
        type: 'SET_BATHROOM_DETAILS',
        payload: theBathroom
      })
    } catch (err) {
      console.log('Saga function fetchBathrooms failed:', err)
    }

  }

  function* detailsSaga() {
    yield takeLatest('SAGA/FETCH_BATHROOM_DETAILS', fetchBathroomDetails);
}
  
export default detailsSaga;