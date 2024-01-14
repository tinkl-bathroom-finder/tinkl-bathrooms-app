// React imports
import { Fragment, useState } from "react";

// MUI material imports
import { Box, Button, Divider,
  Drawer, IconButton, List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText, Stack, Typography } from "@mui/material";

// MUI icons
import WaterDropIcon from '@mui/icons-material/WaterDrop';

function SidebarNav() {
    const [state, setState] = useState({
        left: false
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {/* {['Find a bathroom', 'About', 'My info', 'Admin'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {<WaterDropIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))} */}
          </List>

        </Box>
      );
    
      return (
        <div>
          {['left'].map((anchor) => (
            <Fragment key={anchor}>

              <Button 
              onClick={toggleDrawer(anchor, true)}
              >{anchor}</Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </Fragment>
          ))}
        </div>
      );
    }


export default SidebarNav;
