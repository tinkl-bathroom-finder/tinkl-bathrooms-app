import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h1 id="thankyou">Thank you!</h1>
      <h4>This app would not be possible without:</h4>
      <h5>• Matt Black and the other instructors at Prime</h5>
      <h5>• The Moonstone cohort</h5>
      <h5>• Refuge Restrooms API</h5>
      <h5>• Friends and family</h5>
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
