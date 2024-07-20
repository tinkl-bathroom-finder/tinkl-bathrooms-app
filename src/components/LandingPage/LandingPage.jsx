import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>tinkl</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Hello!
          </p>

          <p>
            tinkl is a bathroom-finder app that locates nearby gender-neutral and single-stall bathrooms.
          </p>

          <p>
            More info coming soon!
          </p>
        </div>
        <div className="grid-col grid-col_1">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
