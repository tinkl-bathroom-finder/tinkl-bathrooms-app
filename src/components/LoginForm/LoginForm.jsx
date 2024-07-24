import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import image1 from "./logo2.png"

import { Button, Box, Typography } from '@mui/material';
import Form from 'react-bootstrap/Form';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const goToRegister = () => {
    history.push('/registration')
  }

  const goToBathrooms = () => {
    history.push('/bathrooms')
  }

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
      <img src={image1} width="100px" 
      onClick={() => goToBathrooms()}></img>
      <Typography 
      variant="h2" 
      component="h4"
      fontWeight='bold'
      align='center'
      sx={{
        // mb: 2,
        cursor: 'pointer'
      }} 
      onClick={() => goToBathrooms()}>
        tinkl
        </Typography>
        <Typography
      variant="p" 
      component="h4"
      align='center'
      sx={{mb: '20px'}}>
        Pee in peace.
        </Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            required
            value={username}
            placeholder=' Username'
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            required
            value={password}
            placeholder=' Password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
        <Button className="btn"
         type="submit" 
         name="submit" 
         value="Log In"
         variant="contained"
         sx={{mt: '20px'}}
         >Log in</Button>
      <Typography>
        Don't have an account yet?
      </Typography>
      <Link to="/registration">Register</Link>
    </Form>
    </Box>
  );
}

export default LoginForm;
