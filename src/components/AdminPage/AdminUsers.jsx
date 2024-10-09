import { Box, Table } from "@mui/material";
import React, { useState, useEffect } from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Button, Card, CardHeader, CardActions, CardContent, IconButton, TableContainer, TableHead, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
// import editIcon from '../../public/edit_icon_transparent.png';


function AdminUsers() {
  const history = useHistory()
  const dispatch = useDispatch();
  const userList = useSelector((store) => store.userList);

  useEffect(() => {
    dispatch({
      type: "SAGA/FETCH_USER_LIST"
    });
  }, []);

    // formats inserted_at timestamp as readable string
    const stringifyDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: "numeric", month: "short", day: "numeric" };
        const stringifiedDate = date.toLocaleDateString("en-us", options);
        return stringifiedDate;
      };
return(
    <Box>

<TableContainer>
        <Table responsive="m" overflow="scroll">
          <TableHead>
            <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {userList?.map((user) => (
            <TableRow>
                <TableCell sx={{borderBottom: '1px solid darkgray'}}>{user.username}</TableCell>

              <TableCell sx={{p: 1, borderBottom: '1px solid darkgray'}}>{user.is_admin ? 'Yes' : ''}</TableCell>
              <TableCell sx={{p: 1, borderBottom: '1px solid darkgray'}}>{`${stringifyDate(user.inserted_at)}`}</TableCell>
              <TableCell sx={{borderBottom: '1px solid darkgray'}}>
                <Button color="warning" variant="contained" size="small" onClick={() => deleteUser(comment.comment_id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      </TableContainer>
    </Box>
)
}

export default AdminUsers;