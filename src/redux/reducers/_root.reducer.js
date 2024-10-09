import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
// imports whatever the file at that address is exporting
import bathrooms from './bathrooms.reducer';
import bathroomDetails from './bathroomDetails.reducer';
import bathroomsByDistance from './bathroomsByDistance.reducer';
import addressCoordinates from './addressCoordinates.reducer';
import apiBathrooms from './apiBathrooms.reducer';
import userComments from './userComments.reducer';
import mapView from './mapView.reducer';
import userList from './userList.reducer';
import placeID from './placeID.reducer';
import replicatedBathroom from './replicatedBathroom.reducer';
import newBathroom from './newBathroom.reducer';
import contactReducer from './contact.reducer';
import userFeedback from './userFeedback.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  bathrooms,
  bathroomDetails,
  bathroomsByDistance,
  addressCoordinates,
  apiBathrooms,
  userComments,
  userList,
  mapView,
  newBathroom,
  placeID,
  replicatedBathroom,
  contactReducer,
  bathroomsToApprove,
  userFeedback
});

export default rootReducer;
