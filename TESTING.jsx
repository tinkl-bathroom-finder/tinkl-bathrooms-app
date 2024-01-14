// React imports
import * as React from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SidebarNav from "./SidebarNav";

// MUI material imports
import {
  AppBar,
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
import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import StarBorder from "@mui/icons-material/StarBorder";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function AppBarNav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    setAnchorEl(null);
    history.push("/info");
  };

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
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Sidebar link list */}
      <List>
        <ListItem key="bathroom" disablePadding>
          <Link
            to="/bathrooms"
            className="linkInDrawer"
            onClick={() => setDrawerOpen(false)}
            underline="none"
            
          >
            <ListItemButton  onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>{<WaterDropIcon />}</ListItemIcon>
              <ListItemText primary="Find a bathroom" />
            </ListItemButton>
          </Link>
        </ListItem>

        {/* About page which is actually /user right now 🤪*/}
        <ListItem key="about" disablePadding>
          <Link
            to="/user"
            className="linkInDrawer"
            onClick={() => setDrawerOpen(false)}
            underline="none"
          >
            <ListItemButton onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>{<WaterDropIcon />}</ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </Link>
        </ListItem>

        {/* "info" aka about app page which is /info... */}
        <ListItem key="info" disablePadding>
          <Link
            to="/about"
            className="linkInDrawer"
            onClick={() => setDrawerOpen(false)}
            underline="none"
          >
            <ListItemButton onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>
                <WaterDropIcon />
              </ListItemIcon>
              <ListItemText primary="Info" />
            </ListItemButton>
          </Link>
        </ListItem>

        {/* Admin page - only appears if user is authorized as an admin */}
        {user.is_admin === true && (
          <>
            <ListItem key="admin" disablePadding>
              <Link
                to="/admin"
                className="linkInDrawer"
                // onClick={() => setDrawerOpen(false)}
                underline="none"
              >
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <WaterDropIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
{/* nested list of admin panel pages */}
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>

                    {/* Add bathrooms page */}
                    <ListItem key="addbathrooms" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon>
                          <AddCircleOutlineOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add bathrooms" />
                      </ListItemButton>
                    </ListItem>

{/* Edit/delete bathrooms page */}
                    <ListItem key="deletebathrooms" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon>
                          <EditNoteOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit/delete bathrooms" />
                      </ListItemButton>
                    </ListItem>

{/* Comments page */}
                    <ListItem key="admin-comments" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon>
                          <CommentOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Comments" />
                      </ListItemButton>
                    </ListItem>

{/* Users list page */}
                    <ListItem key="admin-users" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon>
                          <GroupOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                      </ListItemButton>
                    </ListItem>

                  </List>
                </Collapse>
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <IconButton
                  size="large"
                  edge="start"
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
          {/* <SidebarNav /> */}

          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            tinkl
          </Typography>
          {user.id && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
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
              >
                <MenuItem onClick={goToProfile}>My profile</MenuItem>
                <MenuItem onClick={logOut}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarNav;
