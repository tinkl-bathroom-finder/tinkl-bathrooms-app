import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import image1 from "./../LoginForm/logo2.png"

import { Box, Button, Card, TextField, Typography } from "@mui/material";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
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
    <Form className="formPanel" onSubmit={registerUser} display="flex">
          <img src={image1} width="100px"></img>
      <Typography 
      variant="h2" 
      component="h4"
      fontWeight='bold'
      align='center'
      sx={{
        mb: 2,
      }} >
        tinkl
        </Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            value={username}
            placeholder=" Username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            value={password}
            placeholder=" Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          className="btn"
          type="submit"
          name="submit"
          value="Register"
          align="center"
          variant="contained"
        >
          Register
        </Button>
        <Typography>Already have an account?</Typography>
        <Link to="/login">Log in</Link>
      </Box>
    </Form>
    // </Box>
  );
}

export default RegisterForm;
