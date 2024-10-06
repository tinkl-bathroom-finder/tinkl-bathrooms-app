import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// sends rating and comments to post to database.
function* sendFeedback(action) {
    console.log('comment action', action);
    try {
        yield axios.post('/feedback', action.payload);
        const bathroomId = action.payload.restroom_id
        console.log('bathroomId: ', bathroomId)
        const response = yield axios({
          method: 'GET',
          url: `/details/${bathroomId}`
        })
        const theBathroom = response.data
        console.log('theBathroom, aka response.data', theBathroom)
        yield put({
          type: 'SET_BATHROOM_DETAILS',
          payload: theBathroom
        })
    } catch (error) {
        console.log('Error with Saga sendFeedback function: ', error)
    }
}

function* feedbackSaga() {
    yield takeLatest('SAGA/SEND_FEEDBACK', sendFeedback);
}

export default feedbackSaga;