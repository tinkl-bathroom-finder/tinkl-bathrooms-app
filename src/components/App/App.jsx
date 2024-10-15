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
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import BathroomsPage from "../BathroomsPage/BathroomsPage";
import BathroomDetails from "../BathroomDetails/BathroomDetails";
import MyMap from "../Map/Map";
import AdminPage from "../AdminPage/AdminPage";
import AddAPIBathrooms from "../AdminPage/AddAPIBathrooms";
import DeleteBathrooms from "../AdminPage/DeleteBathrooms";
import AdminComments from "../AdminPage/AdminComments";
import AdminContact from "../AdminPage/AdminContact";
import AdminUsers from "../AdminPage/AdminUsers";
import AddBathroom from "../Nav/AddBathroom";
import MinneDemo from './MinneDemo'
import Contact from '../Contact/Contact'
import AddBathroomErrorPage from "../Nav/AddBathroomErrorPage";

import Container from "react-bootstrap/Container";
// import GoogleMapsWrapper from '../Wrapper';

import { ThemeProvider, createTheme } from '@mui/material';
import "./SignikaNegative-VariableFont_wght.ttf";

import "./App.css";
import ApiBathroomItem from "../ApiBathroomItem/ApiBathroomItem";

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        // periwinkle - AppBar
        main: '#5272F2',
        // off-white - navbar text. Formerly: #072541
        contrastText: '#FFF6F6',
        light: '#FFF6F6',
      },
      secondary: {
        main: '#d20353',

        contrastText: '#ffffff',
      },
      background: {

        default: '#FBECB2',
        // light pink
        paper: '#ffe6e8',
      },
      text: {
        // black
        primary: '#000000',
        // lighter grey
        disabled: '#7b848a',
        // charcoal grey - subheadings, etc
        secondary: '#36454F',
        hint: '#421292'
      },
      error: {
        main: '#c42323',
      },
      info: {
        main: '#3759de',
      },
      success: {
        main: '#43ab46',
      },
      warning: {
        main: '#ed0202',
      },
      divider: '#00695c',
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  
})
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/bathrooms" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AppBarNav />
            <AboutPage />
          </Route>

          <Route exact path="/minnedemo">
          <AppBarNav />
            <MinneDemo embedId="DuBkjVYZN4M"/>
          </Route>

          <Route
            // shows bathrooms page at all times (logged in or not)
            exact
            path="/bathrooms"
          >
            <AppBarNav />
            {/* homepage: shows map by default, or list view. Don't need to be logged in to see*/}
            <BathroomsPage />
            {/* <MyMap /> */}
          </Route>

          <Route 
          exact 
          path="/addbathroom">
            <>          
              <AppBarNav />
              <AddBathroomErrorPage/>
              {/* <AddBathroom /> */}
            </>
          </Route>

{/* for a specific bathroom with id :id */}
          <Route exact path="/bathrooms/:id">
            <AppBarNav />
            <BathroomDetails />
          </Route>

          {/* for api calls to google*/}
          <Route exact path="/api">
            <AppBarNav />
            <ApiBathroomItem />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          <ProtectedRoute
            // logged in shows UserProfile else shows LoginPage
            exact
            path="/user"
          >
          <AppBarNav />
            <UserProfile />
          </ProtectedRoute>

          <ProtectedRoute exact path="/contact">
            <AppBarNav />
            <Contact />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in and admin shows AdminPage else shows LoginPage
            exact
            path="/admin"
          >
            {/* admin page, where you access the add bathrooms/delete bathrooms/etc pages */}
            {user.is_admin ?
          <>
            <AppBarNav /> 
            <AdminPage/>
            </>
            : <Redirect to="/user" />}
          </ProtectedRoute>


          <ProtectedRoute exact path="/admin/addbathrooms">
          {user.is_admin ? 
          <>
            <AppBarNav />
            <AddAPIBathrooms />
            </>
            : <Redirect to="/user" />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/editbathrooms">
          {user.is_admin ? 
          <>
            <AppBarNav />
            <DeleteBathrooms />
          </>
            : <Redirect to="/user" />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/comments">
          {user.is_admin ? 
          <>
            <AppBarNav />
            <AdminComments />
            </>
            : <Redirect to="/user" />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/contact">
          {user.is_admin ? 
          <>
            <AppBarNav />
            <AdminContact />
            </>
            : <Redirect to="/user" />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/users">
          {user.is_admin ? 
          <>
            <AppBarNav />
            <AdminUsers />
            </>
            : <Redirect to="/user" />}
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /bathrooms page
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

          {/* 🔥🔥🔥🔥🔥🔥🔥 This could probably be deleted at some point. There's no link to it anywhere currently */}
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
            <AppBarNav />
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
