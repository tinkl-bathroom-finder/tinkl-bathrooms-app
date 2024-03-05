import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// sends rating and comments to post to database. TO-DO: Need to make a conditional function so that they only post if they aren't empty!
function* sendFeedback(action){
    try{
        yield axios.post('/feedback', action.payload);
    } catch (error) {
        console.log('Error with Saga sendFeedback function: ', error)
    }
}

function* feedbackSaga() {
    yield takeLatest('SAGA/SEND_FEEDBACK', sendFeedback);
}

export default feedbackSaga;