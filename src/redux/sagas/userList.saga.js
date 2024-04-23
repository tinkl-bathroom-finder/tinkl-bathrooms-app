import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getUsers(action) {
    try {
        console.log('We are in the userList saga!');
        const response = yield axios({
            method: 'GET',
            url: '/api/user/all'
    })
    yield put({
        type: 'SET_USERS',
        payload: response.data
      })
    } catch (error) {
      console.log('SAGA/fetchUserList failed: ', error)
    }
  }

function* userListSaga() {
    yield takeLatest('SAGA/FETCH_USER_LIST', getUsers);
}

export default userListSaga;