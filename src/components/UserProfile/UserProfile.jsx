import React, { useState, useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
// import editIcon from '../../public/edit_icon_transparent.png';

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
    dispatch({
      type: "SAGA/DELETE_COMMENT",
      payload: commentId
    });
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
      <div className="user-profile">.🦁</div>
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
              <Link onClick={() => goToDetails(comment.restroom_id)}>
                <td>{comment.name}</td>
              </Link>

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

      <LogOutButton className="btn" />
    </div>
  );
}

export default UserProfile;
