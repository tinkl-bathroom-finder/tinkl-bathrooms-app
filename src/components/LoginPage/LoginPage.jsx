import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        {/* <Button
          type="button"
          variant="contained"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button> */}
      </center>
    </div>
  );
}

export default LoginPage;
