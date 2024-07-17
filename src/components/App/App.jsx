import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//Components
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import AppBarNav from "../Nav/AppBar";
import UserProfile from "../UserProfile/UserProfile";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import BathroomsPage from "../BathroomsPage/BathroomsPage";
import BathroomDetails from "../BathroomDetails/BathroomDetails";
import MyMap from "../Map/Map";
import AdminPage from "../AdminPage/AdminPage";
import AddBathrooms from "../AdminPage/AddBathrooms";
import DeleteBathrooms from "../AdminPage/DeleteBathrooms";
import AdminComments from "../AdminPage/AdminComments";
import AdminUsers from "../AdminPage/AdminUsers";
import ApiBathroomItem from "../ApiBathroomItem/ApiBathroomItem";

//Actions
import primaryUser, { setUser, setUserLocation } from "../../redux/reducers/primaryUser";
import { setAllBathroomsData } from "../../redux/reducers/bathroomData";

//Styles
import { ThemeProvider } from '@mui/material';
import "./App.css";
import "./SignikaNegative-VariableFont_wght.ttf";
import { tinklTheme } from "./theme";

function App() {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.primaryUser);

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

  //Gets lat and lng coordinates from user
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



  return (
    <ThemeProvider theme={tinklTheme}>
      <AppBarNav />
      {/* <BathroomDetails /> */}
      {/* <AboutPage /> */}
      <BathroomsPage />
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
