import { Box, Button, Table, TableContainer, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";


function AdminComments() {
    let feedbackArray = [];

    useEffect(() => {
        axios
            .get('/contact')
            .then((response) => {
                feedbackArray = response.data
                console.log("feedbackArray in GET contact: ", feedbackArray)
            })
            .catch((error) => {
                console.log("Error fetching user feedback: ", error)
            })
    }, [])

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
                    {feedbackArray.map((comment) => {
                        <TableRow>
                            <TableCell sx={{borderBottom: '1px solid darkgray'}}>{comment.username}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid darkgray'}}>{comment.details}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid darkgray'}}>{comment.inserted_at}</TableCell>
                            <TableCell sx={{borderBottom: '1px solid darkgray'}}>
                                <Button>Mark as resolved</Button>
                                </TableCell>
                        </TableRow>
                    })}
                    <TableRow>
                        <TableCell>essiero</TableCell>
                        <TableCell>Hey - this is a test!</TableCell>
                        <TableCell>October 5, 2024</TableCell>
                        <TableCell>
                        <Button color="info" variant="contained" size="small">Mark as resolved</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    )
}

export default AdminComments;