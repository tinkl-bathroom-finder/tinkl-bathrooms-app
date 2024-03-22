import React, { useState, useEffect } from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Button, Card, CardHeader, CardActions, CardContent, IconButton, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
// import editIcon from '../../public/edit_icon_transparent.png';


import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors'

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
  }, [userComments]);

  const goToDetails = (id) => {
    // maybe add a function to set the details before navigating
    // to the bathroom details page
      history.push(`/bathrooms/${id}`)
    }
  

  return (
    <Card className="container" sx={{borderRadius: 0, height: '100vh'}}>
      <CardHeader 
        avatar={
      <Avatar sx={{ bgcolor: deepPurple[400] }}>e</Avatar>
        }
        action={
          <CardActions>
          <IconButton aria-label="edit">
            <EditIcon/>
          </IconButton>
          </CardActions>
        }
        title={userInfo.username}
        subheader={"Joined " + stringifyDate(userInfo.inserted_at)}
      />
      <TableContainer>
        <Table responsive="m" overflow="fit">
          <TableHead >
            <TableRow>
              <TableCell colSpan={3} sx={{borderBottom: '1px solid black', color: "white", textAlign: 'center'}}>My comments:</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {userComments?.map((comment) => (
            <TableRow>
                <TableCell onClick={() => goToDetails(comment.restroom_id)} className="link" sx={{borderBottom: '1px solid darkgray'}}>{comment.name}</TableCell>

              <TableCell sx={{p: 1, borderBottom: '1px solid darkgray'}}>{comment.content}</TableCell>
              <TableCell sx={{borderBottom: '1px solid darkgray'}}>
                <Button color="warning" variant="contained" size="small" onClick={() => deleteComment(comment.comment_id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      </TableContainer>
    </Card>
  );
}

export default UserProfile;
