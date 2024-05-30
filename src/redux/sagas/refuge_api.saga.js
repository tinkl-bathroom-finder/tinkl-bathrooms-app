import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* loadApiBathrooms(action) {
  console.log('in loadApiBathrooms function')
  console.log('action.payload', action.payload)

  //TODO Move API call to server route
  try {
    // makes a get request call to the Refuge Restrooms API for locations by proximity to Minneapolis' coordinates.
    // you can load up to 100 bathrooms per page (perPage value); and then which page to load if they're broken into pages of that many bathrooms.
    const response = yield axios({
      method: 'GET',
      url: `https://refugerestrooms.org/api/v1/restrooms/by_location?lat=44.977753&lng=-93.2650108&search=Minneapolis%2C+Minnesota%2C&per_page=${action.payload.perPage}&page=${action.payload.pageNumber}`
    })
    // sets api bathrooms reducer with array of returned bathrooms
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

// function to add bathrooms to database *from the Refuge Restrooms API* page. TO-DO: Still need to add an "add bathroom" route for regular users.
function* insertBathrooms(action) {
  try {
    console.log('insertBathrooms action.payload:', action.payload)
    yield axios.post('/bathrooms', action.payload)
  } catch (error) {
    console.log('Error with Saga insertBathrooms function: ', error)
  }
}

function* apiSearchSaga() {
  yield takeLatest('SAGA/LOAD_BATHROOMS_FROM_API', loadApiBathrooms);
  yield takeLatest('SAGA/ADD_BATHROOMS_TO_DB', insertBathrooms);

}

export default apiSearchSaga;