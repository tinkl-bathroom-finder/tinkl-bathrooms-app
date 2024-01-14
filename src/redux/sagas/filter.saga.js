import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* searchFilters(action){

}

function* filterSaga() {
    yield takeLatest('SAGA/SET_FILTERS', searchFilters)
}