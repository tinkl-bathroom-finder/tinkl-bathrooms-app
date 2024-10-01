import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchContact() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/contact'
        })
        yield put({
            type: 'SET_CONTACT_DATA',
            payload: response.data
        })
    } catch (error) {
        console.error('Saga function fetchContact failed:', error)
    }
}

function* submitContact(action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: '/contact',
            data: action.payload
        })
        Swal.fire({
            title: "Thank you!",
            text: "Message recieved!",
            icon: "success"
        })
        action.setFeedbackState('')
    } catch (error) {
        Swal.fire({
            title: "Oh no!",
            text: "Something went wrong. Please try again later.",
            icon: "error"
        })
        console.error('Saga function fetchBathrooms failed: ', error)
    }
}

export default function* contactSaga() {
    yield takeLatest('SAGA/FETCH_CONTACT_DATA', fetchContact)
    yield takeLatest('SAGA/SUBMIT_CONTACT', submitContact);
}
