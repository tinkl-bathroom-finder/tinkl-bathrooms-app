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
      <Accordion defaultExpanded
      sx={{ backgroundColor: '#ffe6e8', boxShadow: 'none' }} >
        <AccordionSummary 
        expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header" sx={{flexDirection: "row-reverse"}}
          >
          <Typography color="black" fontWeight="bold">Comments</Typography>
        </AccordionSummary>
        <Box sx={{maxHeight: '25vh', overflowY: 'scroll'}}>
        {commentArray?.map((comment) => {
            return (
                <AccordionDetails key={comment.id}>
                  <Box
                    sx={{
                      pl: "8px",
                      justifyContent: "left",
                      mr: 2
                    }}
                  >
                    <Typography sx={{textAlign: 'left', color: 'darkgrey'}}>{stringifyDate(comment.inserted_at)}</Typography>
                    <Typography variant='body1' color="black" sx={{textAlign: 'left'}}>{comment.content}</Typography>
                  </Box>
                </AccordionDetails>
            )
          })}
                </Box>
      </Accordion>
  )
}


export default CommentList;
