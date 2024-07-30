import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* markAsFlagged(action) {
    console.log('action: ', action)
    try {
        yield axios.post('/flag', action.payload);
        console.log('action.payload: ', action.payload)
    } catch (error) {
        console.log('Error with Saga flagRestroom function: ', error)
    }
}

function* flagRestroomSaga() {
    yield takeLatest('SAGA/FLAG_BATHROOM')
}