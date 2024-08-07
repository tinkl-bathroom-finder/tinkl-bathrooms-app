import React, { useState, useEffect } from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Button, Card, CardHeader, CardActions, CardContent, IconButton, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
// import editIcon from '../../public/edit_icon_transparent.png';
import image1 from './../LoginForm/logo2.png'

import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors'

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
    <Card sx={{ width: '90%', height: 'auto', maxHeight: '80vh', margin: 'auto', borderRadius: '15px', overflowY: 'scroll' }}>
<div class="circle">{userInfo.username.charAt(0)}</div>
<h1>{userInfo.username}</h1>
<h2 class="join-date">{`Joined ${stringifyDate(userInfo.inserted_at)}`}</h2>
<h6 class="comments">My comments:</h6>

         {userComments?.map((comment) => (
           <div>
            <h3 onClick={() => goToDetails(comment.restroom_id)} class="comments, comment-name">
            <img src={image1} width="30px"></img>
            {comment.name}
            </h3>
            <p class="comments" id="comment-content">{comment.content}</p>
            <Button id="delete-comment" color="warning" variant="contained" size="small" onClick={() => deleteComment(comment.comment_id)}>
                 Delete
               </Button>
           </div>
         ))}
         <br/>
    </Card>


    // <Card className="container" sx={{borderRadius: 0, height: '100vh', 
    // backgroundColor: "transparent"}}>
    //   <CardHeader 
    //     avatar={
    //   <Avatar sx={{ bgcolor: deepPurple[400] }}>{userInfo.username.charAt(0)}</Avatar>
    //     }
    //     action={
    //       <CardActions>
    //       <IconButton aria-label="edit">
    //         <EditIcon/>
    //       </IconButton>
    //       </CardActions>
    //     }
    //     title={userInfo.username}
    //     subheader={`Joined ${stringifyDate(userInfo.inserted_at)}`}
    //   />
    //   <Typography gutterBottom variant="h6" component="div">{userInfo.username}</Typography>
    //   <TableContainer>
    //     <Table responsive="m" overflow="fit">
    //       <TableHead >
    //         <TableRow>
    //           <TableCell colSpan={3} sx={{borderBottom: '1px solid black', color: "white", textAlign: 'center'}}>My comments:</TableCell>
    //         </TableRow>
    //       </TableHead>
    //     <TableBody>
    //       {userComments?.map((comment) => (
    //         <TableRow>
    //             <TableCell onClick={() => goToDetails(comment.restroom_id)} className="link" sx={{borderBottom: '1px solid darkgray'}}>{comment.name}</TableCell>

    //           <TableCell sx={{p: 1, borderBottom: '1px solid darkgray'}}>{comment.content}</TableCell>
    //           <TableCell sx={{borderBottom: '1px solid darkgray'}}>
    //             <Button color="warning" variant="contained" size="small" onClick={() => deleteComment(comment.comment_id)}>
    //               Delete
    //             </Button>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>

    //   </TableContainer>
    // </Card>
  );
}

export default UserProfile;
