import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from "react-redux";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function UserProfile() {
const userInfo = useSelector(store => store.user)

  return (
    <div className="container">
      <h2>{userInfo.username}</h2>
      <LogOutButton className="btn" />
    </div>
  );
}

export default UserProfile;
