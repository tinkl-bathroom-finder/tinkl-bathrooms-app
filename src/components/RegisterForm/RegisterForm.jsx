import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

import { Box, Button, Card, TextField, Typography } from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    // <Box 
    // display="flex"
    // flexDirection="column"
    // align="center"
    // className="form-box"
    // >
    <Form className="formPanel" onSubmit={registerUser} display='flex'>
      <Typography 
      variant="h4"
      fontWeight='500'
      align='center'
      color='#FFF6F6'
      sx={{
        mb: 2
      }}
      >Register User</Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>

          <TextField
            type="text"
            label="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            margin="normal"
          />
      </div>
      <div>
          <TextField
            type="password"
            label="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <Box 
  display="flex"
  flexDirection="column"
  alignItems="center"
  >
        <Button className="btn" type="submit" name="submit" value="Register" align='center' variant='contained' sx={{borderRadius: 28, m: 4}}>Register</Button>
      </Box>
    </Form>
    // </Box>
  );
}

export default RegisterForm;
