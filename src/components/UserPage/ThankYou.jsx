import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './ThankYou.css';

function UserPage() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <Grid className="container" container spacing={1} sx={{mt: 5}}>
    <h1>About this app </h1>
    
      <div className = 'aboutBox'>
        <h2> Technologies Used</h2>
        <ul>
          <li>HTML   • CSS     • Javascript       • React.js
            • SweetAlert            • Material UI    <br/>      
              • Bootstrap
            • Refuge Restrooms API            • Google Maps API</li>
        </ul>

        <h2>Challenges</h2>
        <ul>
          <li>Google Maps</li>
          <li>Data cleanup</li>
        </ul>

        <h2>Next Steps</h2>
        <ul>
          <li>Get map view working</li>
          <li>Add user badges</li>
        </ul>
<h4>This app would not be possible without:</h4>
<ul>
<li>Matt, Dane, Key, Dev and the other instructors at Prime</li>
 <li>The Moonstone cohort</li>
<li>James SQL Jobs</li>
 <li>My mentors and the Prime community</li>
    </ul> 
     </div>
  </Grid>
);
  //   <Box>
  //   <Grid container spacing={2}>
  //     <Grid item xs={8}></Grid>
  //     <Item id="thankyou" fontWeight="500">Thank you!</Item>
  //     <h4>This app would not be possible without:</h4>
  //     <h5>• Matt Black and the other instructors at Prime</h5>
  //     <h5>• The Moonstone cohort</h5>
  //     <h5>• Refuge Restrooms API</h5>
  //     <h5>• Friends and family</h5>
  //     {/* <LogOutButton className="btn" /> */}
  // </Grid>
  // </Box>
}

// this allows us to use <App /> in index.js
export default UserPage;
