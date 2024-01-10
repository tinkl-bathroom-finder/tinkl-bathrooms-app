import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* removeBathroom(action) {
  console.log(
    "Congrats, you are in removeBathroom function with action.payload:",
    action.payload
  );
  try {
    // selects comment to "delete" (change "is_removed" to true)
    const response = yield axios.put(`/bathrooms/${action.payload}`);
    // then re-render comment list
    yield;
    put({
      type: "SAGA/FETCH_BATHROOMS",
    });
    yield Swal.fire({
      title: "Removed!",
      text: "This bathroom has been removed.",
      icon: "success",
    });
  } catch (error) {
    console.log(`Error removing bathroom`, error);
  }
}

function* deleteBathroom(action) {
  console.log("In deleteBathroom function. action.payload is:", action.payload);
  try {
    const response = yield axios({
      method: "DELETE",
      url: `/bathrooms/${action.payload}`,
    });
    yield Swal.fire({
      title: "Deleted!",
      text: "This bathroom has been permanently deleted from the database.",
      icon: "success",
    });
    yield put({
      type: "SAGA/FETCH_BATHROOMS",
    });
  } catch (error) {
    console.log("DELETE /bathrooms/:id fail", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: error,
    });
  }
}

function* deleteBathroomSaga() {
  yield takeLatest("SAGA/DISABLE_BATHROOM", removeBathroom);
  yield takeLatest("SAGA/DELETE_BATHROOM", deleteBathroom);
}

export default deleteBathroomSaga;
