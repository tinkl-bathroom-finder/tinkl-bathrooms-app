import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Box } from '@mui/material';


function RegisterPage() {
  const history = useHistory();

  return (
    <Box 
    display="flex"
    flexDirection="column"
    alignItems="center"
    >
      <RegisterForm />
    </Box>
  );
}

export default RegisterPage;
