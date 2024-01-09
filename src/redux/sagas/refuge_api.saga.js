import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* loadApiBathrooms(action){
    console.log('in loadApiBathrooms function')
    console.log('action.payload', action.payload)
    try {
        const response = yield axios({
          method: 'GET',
          url: `https://refugerestrooms.org/api/v1/restrooms/by_location?lat=44.977753&lng=-93.2650108&search=Minneapolis%2C+Minnesota%2C&per_page=${action.payload.perPage}&page=${action.payload.pageNumber}`
    
        //   url: `/api/?perPage=${action.payload.perPage}&pageNumber=${action.payload.pageNumber}`
        })
// sets api bathrooms reducer with returned bathrooms
      yield put({
        type: 'SET_API_BATHROOMS',
        payload: response.data
      })
      // flip isLoading back to false
      action.payload.setIsLoading(false)
    } catch (error) {
        console.log('API get request failed:', error)
    }
}

function* apiSearchSaga(){
    yield takeLatest('SAGA/LOAD_BATHROOMS_FROM_API', loadApiBathrooms)
}

export default apiSearchSaga;