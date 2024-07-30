import { Box, Table } from "@mui/material";
import React, { useState, useEffect } from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Button, Card, CardHeader, CardActions, CardContent, IconButton, TableContainer, TableHead, TableBody, TableCell, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
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
    <Box sx={{mt: 10}}>

<TableContainer>
        <Table responsive="m" overflow="scroll">
          <TableHead >
            <TableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Admin</StyledTableCell>
                <StyledTableCell>Joined</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {userList?.map((user) => (
            <TableRow>
                <StyledTableCell>{user.username}</StyledTableCell>

              <StyledTableCell>{user.is_admin ? 'Yes' : ''}</StyledTableCell>
              <StyledTableCell>{`${stringifyDate(user.inserted_at)}`}</StyledTableCell>
              <StyledTableCell align="center">
                <Button color="warning" variant="contained" size="small" onClick={() => deleteUser(comment.comment_id)}>
                  Delete
                </Button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      </TableContainer>
    </Box>
)
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default AdminUsers;