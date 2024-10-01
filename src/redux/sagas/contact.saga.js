import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* submitContact(action) {
    console.log(action)
    try {
        const response = yield axios({
            method: 'POST',
            url: '/contact',
            data: action.payload
        })
    } catch (error) {
        console.log('Saga function fetchBathrooms failed: ', error)
    }
}

export default function* contactSaga() {
    yield takeLatest('SAGA/SUBMIT_CONTACT', submitContact);
}
