import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// TO-DO: to be used in the future to filter bathrooms by different parameters: wheelchair accessible, changing table, single stall, open now, etc.
function* searchFilters(action){

}

function* filterSaga() {
    yield takeLatest('SAGA/SET_FILTERS', searchFilters)
}