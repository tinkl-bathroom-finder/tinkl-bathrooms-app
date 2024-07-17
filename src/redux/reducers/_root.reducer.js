import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
// imports whatever the file at that address is exporting
import bathrooms from './bathrooms.reducer';
import bathroomsByDistance from './bathroomsByDistance.reducer';
import addressCoordinates from './addressCoordinates.reducer';
import apiBathrooms from './apiBathrooms.reducer';
import userComments from './userComments.reducer';
import mapView from './mapView.reducer';
import userList from './userList.reducer';

//New Slice Reducers
import primaryUser from './primaryUser';
import bathroomData from './bathroomData';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  primaryUser,
  bathroomData,
});

export default rootReducer;
