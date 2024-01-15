import React, { useState, useEffect } from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
// import editIcon from '../../public/edit_icon_transparent.png';


import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors'

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function UserProfile() {
  const history = useHistory()
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user);
  const userComments = useSelector((store) => store.userComments);
  const userId = userInfo.id;

  // formats inserted_at timestamp as readable string
  const stringifyDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const stringifiedDate = date.toLocaleDateString("en-us", options);
    return stringifiedDate;
  };

  const editUsername = () => {};
  const deleteComment = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      imageUrl: "https://media.giphy.com/media/Dxcny6WwMO43du9QRu/giphy.gif",
      imageWidth: 250,
      imageHeight: 250,
      imageAlt: "Rainbow pixel poop",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, flush it!"
    }).then((result) => {
      if (result.isConfirmed) {
    dispatch({
      type: "SAGA/DELETE_COMMENT",
      payload: commentId
    });
  }})
  };

  useEffect(() => {
    dispatch({
      type: "SAGA/FETCH_USER_INFO",
      payload: userId,
    });
  }, []);

  const goToDetails = (id) => {
    // maybe add a function to set the details before navigating
    // to the bathroom details page
      history.push(`/bathrooms/${id}`)
    }
  

  return (
    <div className="container">
      <Avatar sx={{ bgcolor: deepOrange[400] }}>🦁</Avatar>
      <h2 className="profile">{userInfo.username}</h2>
      <span onClick={editUsername}>✎</span>
      <p>Member since {stringifyDate(userInfo.inserted_at)}</p>
      <p className="profile">My comments:</p>
      <table>
        <thead>
          {/* <tr>
      <th>Restroom</th>
      <th>Comment</th>
      <th>Date</th>
    </tr> */}
        </thead>
        <tbody>
          {userComments.map((comment) => (
            <tr>
                <td onClick={() => goToDetails(comment.restroom_id)} className="link">{comment.name}</td>

              <td>{comment.content}</td>
              <td>{userInfo.username}</td>
              <td>{stringifyDate(comment.inserted_at)}</td>
              <td>
                <Button variant="danger" size="small" onClick={() => deleteComment(comment.comment_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

export default UserProfile;
