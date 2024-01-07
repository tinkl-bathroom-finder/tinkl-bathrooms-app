import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendFeedback(action){
    try{
        yield axios.post('/feedback', action.payload);
        yield axios.put('/feedback', action.payload);
    } catch (error) {
        console.log('Error with Saga sendFeedback function: ', error)
    }
}

function* feedbackSaga() {
    yield takeLatest('SAGA/SEND_FEEDBACK', sendFeedback);
}

export default feedbackSaga;