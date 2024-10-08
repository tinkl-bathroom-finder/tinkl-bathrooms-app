// React imports
import * as React from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// MUI material imports
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Collapse,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";

// MUI icons
import {
  AddCircle,
  AccountCircle,
  AddCircleOutlineOutlined,
  CommentOutlined,
  EditNoteOutlined,
  ExpandLess,
  ExpandMore,
  GroupOutlined,
  Help,
  WaterDrop,
  QrCode2,
} from "@mui/icons-material";

// misc. icons
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { deepPurple } from '@mui/material/colors';
import { PwaInstall } from "../PwaInstall/PwaInstall";


function AppBarNav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const userInfo = useSelector((store) => store.user);

  // function to open or close drawer NavBar
  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // closes menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    setAnchorEl(null);
    history.push("/user");
  };

  const goToLogin = () => {
    history.push('/login')
    setAnchorEl(null);

  };

  const goToBathrooms = () => {
    history.push('/bathrooms')
  }

  const goToRegister = () => {
    history.push('/registration')
  }

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    setAnchorEl(null);
  };

  const [state, setState] = useState({
    left: false,
  });



  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
      // 👇 removing this return is what was breaking my sidebar drawer
    ) {
      return
    }

    setState({ ...state, [anchor]: open });
  };
  // sidebar list - could be moved to its own component at some point, need to figure out how to pass down toggleDrawer function - saga?
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Sidebar link list */}
      <List>
        <ListItem key="installApp" disablePadding>
          <ListItemButton>
            {/* <ListItemIcon>{<InstallMobileIcon />}</ListItemIcon> */}
            {/* <ListItemText primary="INSTALL APP" /> */}
            <PwaInstall />
          </ListItemButton>
        </ListItem>

        <ListItem key="bathroom" disablePadding>
          <Link
            to="/bathrooms"
            className="linkInDrawer"
            onClick={() => setDrawerOpen(false)}
            underline="none"
          >
            <ListItemButton onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>{<WaterDrop />}</ListItemIcon>
              <ListItemText primary="Find a bathroom" />
            </ListItemButton>
          </Link>
        </ListItem>


        {/* "info" aka about app page which is /info... */}
        <ListItem key="about" disablePadding>
          <Link
            to="/about"
            className="linkInDrawer"
            onClick={() => setDrawerOpen(false)}
            underline="none"
          >
            <ListItemButton onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem key="add" disablePadding>
          <Link
            to="/addbathroom"
            className="linkInDrawer"
            onClick={() => setDrawerOpen(false)}
            underline="none"
          >
            <ListItemButton onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="Add bathroom" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem key="qr" disablePadding>
          <Link
            to="/minnedemo"
            className="linkInDrawer"
            onClick={() => setDrawerOpen(false)}
            underline="none"
          >
            <ListItemButton onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>
                <QrCode2 />
              </ListItemIcon>
              <ListItemText primary="Show QR code" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem key="contact" disablePadding>
          <Link
            to="/contact"
            className="linkInDrawer"
            onClick={() => setDrawerOpen(false)}
            underline="none"
          >
            <ListItemButton onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </Link>
        </ListItem>

        {/* Admin page - only appears if user is authorized as an admin */}
        {user.is_admin === true && (
          <>
            <ListItem key="admin" disablePadding>

              <Link
                to="/admin/"
                className="linkInDrawer"
                // onClick={() => setDrawerOpen(false)}
                underline="none"
                >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItemButton>
              </Link>
            </ListItem>
          </>
        )}

      </List>
    </Box>
  );

  return (

    <Box sx={{ flexGrow: 1, mb: 15 }}>
      {/* Top NavBar with hamburger menu, tinkl, and user profile or login button */}
      <AppBar className="app-bar">
        <Toolbar position="sticky" sx={{ height: 100 }}>
          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <IconButton
                  size="large"
                  // edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(anchor, true)}
                >
                  <MenuIcon />
                </IconButton>

                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>

          <Typography
            variant="h4"
            component="div"
            fontWeight="bold"
            textAlign={"center"}
            sx={{ flexGrow: 1, fontSize: 50, cursor: 'pointer' }}
            onClick={goToBathrooms}>
            tinkl
          </Typography>
          {/* If a user is logged in, an account circle icon will appear in the upper right in the top NavBar */}
          {/* If a user clicks on the account circle icon, a menu will pop up with the choices of "My profile" or "Log out" */}
          {user.id ? (
            <div>
              <Avatar
                sx={{ color: 'darkslategrey', bgcolor: "#ffe6e8", border: 1, borderColor: '#FFF6F6', fontWeight: 'bold' }}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >{userInfo.username.charAt(0)}</Avatar>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  borderRadius: '20px'
                }}
              >
                <MenuItem onClick={goToProfile} sx={{ color: 'darkslategray' }}>My profile</MenuItem>
                <MenuItem onClick={logOut} sx={{ color: 'darkslategray' }}>Log out</MenuItem>
              </Menu>
              {/* If a user is not logged in, an account circle icon will appear in the upper right in the top NavBar */}
              {/* If a user clicks on the account circle icon, a menu will pop up with the choice of "Log in" */}
            </div>) :
            <div>
              <IconButton
                size="large"
                aria-label="guest user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  borderRadius: '20px'
                }}
              >
                <MenuItem onClick={goToLogin} sx={{ color: 'darkslategray' }}>Log in</MenuItem>
                <MenuItem onClick={goToRegister} sx={{ color: 'darkslategray' }}>Register</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarNav;
