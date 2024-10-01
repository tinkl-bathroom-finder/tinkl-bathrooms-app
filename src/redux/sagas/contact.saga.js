import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* submitContact(action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: '/contact',
            payload: action.payload
        })
    } catch (error) {
        console.log('Saga function fetchBathrooms failed: ', error)
    }
}

export default function* contactSaga() {
    yield takeLatest('SAGA/SUBMIT_CONTACT', submitContact);
}
