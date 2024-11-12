import axios from 'axios';
import { put, take, takeLatest } from "redux-saga/effects";

function* flagBathroom(action) {
	try {
		yield axios.post('/flag', action.payload)
		yield Swal.fire({
			title: "Thank you for sharing! Users help keep this app up-to-date.",
			width: 600,
			padding: "3em",
			color: "#716add",
			background:
				"#fff url(https://media.giphy.com/media/ifMCKz51hfD9RUWXbI/giphy.gif)",
			backdrop: `
			  rgba(0,0,123,0.4)
			  url("https://media.giphy.com/media/mTs11L9uuyGiI/giphy.gif")
			  left top
			  no-repeat
			`,
		})
		action.close(false)
	} catch (error) {
		console.error('SAGA flagBathroom failed:', error)
		Swal.fire({
			title: "Oops!",
			text: 'Looks like that didn\'t quite work. Please try again later!',
			width: 600,
			padding: "3em",
			color: "#716add",
			background:
				"#fff url(https://media.giphy.com/media/ifMCKz51hfD9RUWXbI/giphy.gif)",
			backdrop: `
			  rgba(0,0,123,0.4)
			  url("https://media.giphy.com/media/mTs11L9uuyGiI/giphy.gif")
			  left top
			  no-repeat
			`,
		})
	}
}

function* flagBathroomSaga() {
	yield takeLatest('SAGA/FLAG_BATHROOM', flagBathroom)
}

export default flagBathroomSaga;
