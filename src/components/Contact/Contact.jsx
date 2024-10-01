import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';


export default function Contact() {

  const dispatch = useDispatch()
  const [feedback, setFeedback] = useState('')

  const setFeedbackState = (text) => {
    setFeedback(text)
  }

  const submitFeedback = () => {
    if (feedback.length > 0) {
      dispatch({
        type: 'SAGA/SEND_FEEDBACK',
        payload: {'feedback': feedback}
      })
    } else {
      Swal.fire({
        title: "Hey!!",
        text: "Please write a comment if you want to submit feedback!",
        icon: "warning"
      });
    }
  }

  return (
    <div className="container">

      {/* heading */}
      <h1>Contact Us!</h1>

      {/* textbox */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <TextField
          placeholder="Suggestions, comments, concerns..."
          multiline
          rows={6}
          fullWidth
          value={feedback}
          onChange={() => setFeedbackState(event.target.value)}
        />
      </Box>

      {/* submit button */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 2}}
      >
        <Button variant="contained" onClick={() => submitFeedback()}>
          Submit
        </Button>
      </Box>
    </div>
  )
}
