import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

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

import Container from "react-bootstrap/Container";
// import GoogleMapsWrapper from '../Wrapper';

import { ThemeProvider } from '@mui/material';
import "./SignikaNegative-VariableFont_wght.ttf";

import "./App.css";
import ApiBathroomItem from "../ApiBathroomItem/ApiBathroomItem";
import { tinklTheme } from "./theme";

function App() {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={tinklTheme}>

      <AppBarNav />
      {/* <BathroomDetails /> */}
      {/* <AboutPage /> */}
      <BathroomsPage />
      {/* <ApiBathroomItem /> //ToDo: Runs the Gocoding API */}
      {/* <UserProfile />  //Shows users own comments */}

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
