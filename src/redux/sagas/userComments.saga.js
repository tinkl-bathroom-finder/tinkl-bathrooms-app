import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* removeUserComment(action) {
    console.log('Congrats, you are in removeUserComment function with action.payload:', action.payload)
    try {
        // selects comment to "delete" (change "is_removed" to true)
        const response = yield axios.put(`/comments/${action.payload}`);
        // then re-render comment list
        yield 
        console.log('response.data.user_id: in removeUserComment', response.data.user_id)
        put({ 
            type: 'SAGA/FETCH_USER_INFO',
            payload: response.data.user_id
        });
    } catch (error) {
        console.log(`Error deleting item`, error);
        // SweetAlert popup delete confirmation window
    }    Swal.fire({
        title: "Deleted!",
        text: "Your comment has been deleted.",
        icon: "success"
      });
}

function* fetchUserComments(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: `/comments/${action.payload}`
    })
    yield put({
        type: 'SET_USER_INFO',
        payload: response.data
      })
    } catch (error) {
      console.log('SAGA/fetchUserComments failed: ', error)
    }
  }

function* userCommentsSaga() {
    yield takeLatest('SAGA/FETCH_USER_INFO', fetchUserComments);
    yield takeLatest('SAGA/DELETE_COMMENT', removeUserComment);
}

export default userCommentsSaga;