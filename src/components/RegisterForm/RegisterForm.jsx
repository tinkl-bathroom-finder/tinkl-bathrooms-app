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
      component="h4"
      fontWeight='500'
      align='center'
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
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <Box 
  display="flex"
  flexDirection="column"
  alignItems="center"
  >
        <Button className="btn" type="submit" name="submit" value="Register" align='center' variant='contained'>Register</Button>
      </Box>
    </Form>
    // </Box>
  );
}

export default RegisterForm;
