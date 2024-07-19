import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//Components
import Footer from "../Footer/Footer";
import BathroomsPage from "../BathroomsPage/BathroomsPage";
import { MapView } from "../Refactored/MapView";
import AppBarNav from "../Nav/AppBar";

//Actions
import { setUser, setUserLocation } from "../../redux/reducers/primaryUser";
import { setAllBathroomsData } from "../../redux/reducers/bathroomData";

//Styles
import { ThemeProvider } from '@mui/material';
import "./App.css";
import "./SignikaNegative-VariableFont_wght.ttf";
import { tinklTheme } from "./theme";

function App() {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.primaryUser);
  const bathroomData = useSelector((state) => state.bathroomData);

  //Checks for logged in user
  useEffect(() => {
    if (!user.username) {
      axios.get('/api/user').then((response) => {
        dispatch(setUser(response.data));
      }).catch((error) => {
        console.log('Error Fetching user from server', error);
      });
    }
  }, [user.username]);

  //Gets lat and lng coordinates from user and places it in redux state
  useEffect(() => {
    if (navigator.geolocation) {
      const watcher = navigator.geolocation.watchPosition(
        (position) => {
          dispatch(setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }));
        },
        (error) => {
          console.error('Error watching position:', error);
        }
      );

      //Return cleans up the watcher on component unmount
      return () => {
        navigator.geolocation.clearWatch(watcher);
      }
    } else {
      console.error('Golocation is not supported by this browser');
    }
  }, []);

  //Fetches bathroom data from the server and places it in redux state
  useEffect(() => {
    if (user.location) {
      axios.get('/bathrooms')
        .then((response) => {
          dispatch(setAllBathroomsData(response.data));
        }).catch((error) => {
          console.error('Error fetching bathroom data', error);
        })
    }
  }, []);

  useEffect(() => {
    console.log('App data', bathroomData)
  }, []);



  return (
    <ThemeProvider theme={tinklTheme}>
      <AppBarNav />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
      }}>
        <div style={{
          width: 360,
          height: 600,
          border: '2px solid black'
        }}>
          <MapView />
          {/* <BathroomsPage /> */}
        </div>
      </div>
      {/* <BathroomDetails /> */}
      {/* <AboutPage /> */}
      {/* <ApiBathroomItem /> //ToDo: Runs the Gocoding API */}
      {/* <UserProfile />  //Shows users own comments */}
      {/* <LoginPage /> */}

      {/* <AboutPage />
      <BathroomsPage />
      <BathroomDetails />
      <ApiBathroomItem />
      <UserProfile />

      <AdminPage />

      <AddBathrooms />

      <DeleteBathrooms />

      <AdminComments />

      <AdminUsers />

      <LoginPage />

      <RegisterPage /> */}
      <Footer />
    </ThemeProvider>
  );
}

export default App;
