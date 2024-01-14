import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import AppBarNav from "../Nav/AppBar";
import UserPage from "../UserPage/ThankYou";
import UserProfile from "../UserProfile/UserProfile";
import LandingPage from "../LandingPage/LandingPage";
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

import SidebarNav from "../Nav/SidebarNav";
import Container from "react-bootstrap/Container";
// import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import { DotLoader } from "react-spinners";
// import GoogleMapsWrapper from '../Wrapper';

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {/* <Nav/> */}
        <AppBarNav />
        {/* <SidebarNav /> */}
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/bathrooms" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route
            // shows bathrooms page at all times (logged in or not)
            exact
            path="/bathrooms"
          >
            <BathroomsPage />
            {/* <MyMap /> */}
          </Route>

          <Route exact path="/bathrooms/:id">
            <BathroomDetails />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserProfile else shows LoginPage
            exact
            path="/info"
          >
            <UserProfile />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in and admin shows AdminPage else shows LoginPage
            exact
            path="/admin"
          >
            {user.is_admin ? 
            <AdminPage />
            : <Redirect to="/user" />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/addbathrooms">
          {user.is_admin ? 
            <AddBathrooms />
            : <Redirect to="/user" />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/editbathrooms">
          {user.is_admin ? 
            <DeleteBathrooms />
            : <Redirect to="/user" />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/comments">
          {user.is_admin ? 
            <AdminComments />
            : <Redirect to="/user" />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/users">
          {user.is_admin ? 
            <AdminUsers />
            : <Redirect to="/user" />}
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/bathrooms" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/bathrooms" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
