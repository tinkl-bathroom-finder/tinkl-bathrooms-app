import { Box, Button, Table, TableContainer, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


function AdminComments() {
    const dispatch = useDispatch();
    const feedbackArray = useSelector((store) => store.userFeedback)

    useEffect(() => {
        dispatch({
            type: "SAGA/FETCH_USER_FEEDBACK",
          });
    }, [])

      // formats inserted_at timestamp as readable string
  const stringifyDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const stringifiedDate = date.toLocaleDateString("en-us", options);
    return stringifiedDate;
  };
    return (
        <Box>
            <TableContainer>
            <Table responsive="m" overflow="scroll">
                <TableHead>

                <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Mark as resolved</TableCell>
            </TableRow>
                </TableHead>
                <TableBody>
                    {feedbackArray?.map((comment) => (
                        <TableRow>
                            <TableCell sx={{borderBottom: '1px solid darkgray'}}>{comment.username}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid darkgray'}}>{comment.details}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid darkgray'}}>{`${stringifyDate(comment.inserted_at)}`}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid darkgray'}}>
                                <Button color="info" variant="contained" size="small">Mark as resolved</Button>
                                </TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    )
}

export default AdminComments;