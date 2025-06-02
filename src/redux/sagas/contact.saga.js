import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getUserFeedback() {
    try {
        const response = yield axios ({
            method: 'GET',
            url: '/contact'
        })
        yield put({
            type: 'SET_USER_FEEDBACK_ARRAY',
            payload: response.data
        })
    } catch (error) {
        Swal.fire({
            title: "Oh no!",
            text: "Something went wrong. Please try again later.",
            icon: "error"
        })
        console.log('Saga function getUserFeedback failed: ', error)
}}

function* submitContact(action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: '/contact',
            data: action.payload
        })
        Swal.fire({
            title: "Thank you!",
            text: "Message received!",
            icon: "success"
        })
        // clears input for feedback
        action.setFeedbackState('')
    } catch (error) {
        Swal.fire({
            title: "Oh no!",
            text: "Something went wrong. Please try again later.",
            icon: "error"
        })
        console.error('Saga function submitContact failed: ', error)
    }
}

function* resolveComment(action) {
    try {
        yield axios({
            method: 'PUT',
            url: '/contact',
            data: action.payload
        })
        yield put ({type: 'SAGA/FETCH_USER_FEEDBACK'})
    } catch (error) {
        console.error('Saga function resolveComment failed:', error)
    }
}

export default function* contactSaga() {
    yield takeLatest('SAGA/SUBMIT_CONTACT', submitContact);
    yield takeLatest('SAGA/FETCH_USER_FEEDBACK', getUserFeedback);
    yield takeLatest('SAGA/RESOLVE_COMMENT', resolveComment);
}
