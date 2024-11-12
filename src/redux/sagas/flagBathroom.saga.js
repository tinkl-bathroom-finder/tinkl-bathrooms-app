import axios from 'axios';
import { put, take, takeLatest } from "redux-saga/effects";

function* flagBathroom(action) {
	try {
		yield axios.post('/flag', action.payload)
		console.log(action.payload)
	} catch (error) {
		console.error('SAGA flagBathroom failed:', error)
	}
}

function* flagBathroomSaga() {
	yield takeLatest('SAGA/FLAG_BATHROOM', flagBathroom)
}

export default flagBathroomSaga;
