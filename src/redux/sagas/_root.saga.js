import { all, takeLatest } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import bathroomSaga from './bathroom.saga';
import addressSaga from './address.saga';
import bathroomsByDistanceSaga from './bathroomsByDistance.saga';
import detailsSaga from './details.saga';
import feedbackSaga from './feedback.saga';
import apiSearchSaga from './refuge_api.saga';
import userCommentsSaga from './userComments.saga';
import deleteBathroomSaga from './deleteBathroom.saga';
import userListSaga from './userList.saga';
import filterSaga from './filter.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    bathroomSaga(),
    addressSaga(),
    bathroomsByDistanceSaga(),
    detailsSaga(),
    feedbackSaga(),
    apiSearchSaga(),
    userCommentsSaga(),
    deleteBathroomSaga(),
    userListSaga(),
    filterSaga()
  ]);
}
