import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import { Button, Box, Typography } from '@mui/material';
import Form from 'react-bootstrap/Form';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Box 
    display="flex"
    flexDirection="column"
    align="center"
    justifyContent="center"
    className="form-box"
    >
    <Form display='flex' className="formPanel" onSubmit={login}>
      <Typography 
      variant="h4" 
      component="h4"
      fontWeight='500'
      align='center'
      color='#FFF6F6'
      sx={{
        mb: 2
      }} >
        Login
        </Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
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
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <Box textAlign='center'>
        <Button className="btn"
         type="submit" 
         name="submit" 
         value="Log In"
         variant="contained">Log in</Button>
      </Box>
    </Form>
    </Box>
  );
}

export default LoginForm;
