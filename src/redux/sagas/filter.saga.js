import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useSelector } from 'react-redux';

// TO-DO: to be used in the future to filter bathrooms by different parameters: wheelchair accessible, changing table, single stall, open now, etc.
function* searchFilters(action){
    try {
        const response = yield axios({
          method: 'GET',
          url: '/bathrooms'
        })
        let bathroomArray = response.data;
        let filteredBathroomsArray = response.data?.filter(function (br) {
            return br.public === action.payload;
        })
        if(action.payload === true){
          console.log('isPublic is true')
        yield put({
          type: 'SET_BATHROOMS',
          payload: filteredBathroomsArray
        }) 
        } else if (action.payload === false){
          console.log('isPublic is false')
            yield put({
                type: 'SET_BATHROOMS',
                payload: bathroomArray
              }) 
        }
      } catch (error) {
        console.log('Saga function fetchBathrooms failed: ', error)
      }
}



function* filterSaga() {
    yield takeLatest('SAGA/SET_FILTERS', searchFilters)
}

export default filterSaga;