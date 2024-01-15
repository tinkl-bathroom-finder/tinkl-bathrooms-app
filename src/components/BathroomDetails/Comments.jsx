import { useState } from "react";
import { useSelector } from "react-redux";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Comment } from "@mui/icons-material";

function CommentList() {
  const theBathroomDetails = useSelector((store) => store.bathroomDetails)
  const commentArray = theBathroomDetails.comments
  return (
    <Box >
      <Accordion defaultExpanded>
        <AccordionSummary 
        expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header">
          <Typography color="black">Comments</Typography>
        </AccordionSummary>
        {commentArray &&
          commentArray.map((comment) => {
            console.log('comment: ', comment)
            console.log('commentArray: ', commentArray)
            return (
              <>
                <AccordionDetails>
                  <Box
                    sx={{
                      border: "1px solid",
                      padding: "8px",
                      justifyContent: "left",
                      mr: 2
                    }}
                  >
                    <Typography variant='subtitle1'></Typography>
                    <Typography variant='body1' color="black">{comment}</Typography>
                  </Box>
                </AccordionDetails>
              </>
            )
          })}
      </Accordion>
    </Box>
  )
}


export default CommentList;
