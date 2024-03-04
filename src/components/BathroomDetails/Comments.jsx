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

    // formats inserted_at timestamp as readable string
    const stringifyDate = (timestamp) => {
      const date = new Date(timestamp);
      const options = { year: "numeric", month: "short", day: "numeric" };
      const stringifiedDate = date.toLocaleDateString("en-us", options);
      return stringifiedDate;
    };

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
            console.log('comment:', comment)
            return (
              <>
                <AccordionDetails>
                  <Box
                    sx={{
                      // border: "1px solid",
                      padding: "8px",
                      justifyContent: "left",
                      mr: 2
                    }}
                  >
                    {/* <Typography>On {stringifyDate(comment.inserted_at)}, a user wrote:</Typography> */}
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
