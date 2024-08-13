import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";

import Collapse from "@mui/material/Collapse";
import DirectionsIcon from "@mui/icons-material/Directions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import BabyChangingStationOutlinedIcon from "@mui/icons-material/BabyChangingStationOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import TransgenderOutlinedIcon from "@mui/icons-material/TransgenderOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import Man4Icon from "@mui/icons-material/Man4";
import Table from "react-bootstrap/Table";
import { ConstructionOutlined, More } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import BusinessHours from "./BusinessHours";


// animation for 'expand comments' chevron
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function BathroomItemMap({ bathroom, origin }) {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goToDetails = () => {
    // maybe add a function to set the details before navigating
    // to the bathroom details page
    history.push(`/bathrooms/${bathroom.id}`);
  };


  // opens location in GoogleMaps in new tab
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  // formats inserted_at timestamp as readable string
  const stringifyDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const stringifiedDate = date.toLocaleDateString("en-us", options);
    return stringifiedDate;
  };

  
    const date = new Date();
    let day = date.getDay(); // day comes back as number => 1 is Monday, 2 is Tuesday, etc.
    let hour = date.getHours() * 100; // formats hour as military time
    let minutes  = date.getMinutes();
    let militaryTime = hour + minutes // we don't actually need to convert this to a string since we want to compare it as a numeral

   const compareTime = (day) => {
    let isOpen = false;
    if (day = 1 && militaryTime >= bathroom.day_1_open && militaryTime <= bathroom.day_1_close){
      isOpen = true;
    }  else if (day = 2 && militaryTime >= bathroom.day_2_open && militaryTime <= bathroom.day_2_close){
      isOpen = true;
    } else if (day = 3 && militaryTime >= bathroom.day_3_open && militaryTime <= bathroom.day_3_close){
       isOpen = true;
    } else if (day = 4 && militaryTime >= bathroom.day_4_open && militaryTime <= bathroom.day_4_close){
      isOpen = true;
    } else if (day = 5 && militaryTime >= bathroom.day_5_open && militaryTime <= bathroom.day_5_close){
      isOpen = true;
    } else if (day = 6 && militaryTime >= bathroom.day_2_open && militaryTime <= bathroom.day_2_close){
      isOpen = true;
    }  else if (day = 7 && militaryTime >= bathroom.day_2_open && militaryTime <= bathroom.day_2_close){
      isOpen = true;
    }  else{console.log('close')
    } return isOpen;
   }
  
  let isOpen = compareTime();



  return (
    <>
      <Grid2
        key={bathroom.id}
        width="100%"
        // padding-left (https://mui.com/system/spacing/)
      >
        <Card
          sx={{
            mb: "5px",
            // height: '25vw'
            width: "100%",
            height: "auto"
          }}
          // if you click on the bathroom item card, it will expand with more details
          onClick={handleExpandClick}
        >
          <CardHeader
            sx={{ pb: 0 }}
            title={bathroom.name}
            titleTypographyProps={{ fontSize: "large" }}
            subheader={bathroom.street}
            action={
              <>
                {/* icons to show if bathrooms is all-gender, has changing table, is wheelchair accessible */}
                <Typography variant="h6" align="right" sx={{ mr: 1, mt: 0.5 }}>
                  {bathroom.unisex ? <TransgenderOutlinedIcon /> : ""}
                  {bathroom.changing_table ? (
                    <BabyChangingStationOutlinedIcon />
                  ) : (
                    ""
                  )}
                  {bathroom.accessible ? <AccessibleForwardOutlinedIcon /> : ""}
                  {bathroom.is_single_stall ? <Man4Icon /> : ""}
                </Typography>

                {/* chevron to expand bathroom item card */}
                <Typography
                  variant="h6"
                  align="right"
                  color={"grey"}
                  sx={{ mr: 1, mt: 2, verticalAlign: 'bottom' }}
                >
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </Typography>
              </>
            }
          />
          <CardContent sx={{ p: 2 }}>
          <h6 class={isOpen ? "open" : "closed"}> {isOpen ? 'Open now' : 'Closed'}</h6>

            {/* distance from current/searched location */}
            <Typography
                  align="right"
                  color="text.secondary"
                  sx={{
                    mr: 2,
                  }}
                >
                  {bathroom.distance
                    ? `${bathroom.distance.toFixed(2)} mi`
                    : ""}
                </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              
          <BusinessHours bathroom={bathroom}/>
          {/* when bathroom info was last updated */}
              <Typography
                sx={{ fontSize: 14, mr: 2, ml: 2 }}
                color="text.secondary"
                align="left"
              >
                {`Updated ${stringifyDate(bathroom.updated_at)}`}
              </Typography>
              {/* moves chevron to right */}
              <CardActions sx={{ display: "inline-block" }}>
                {/* bathroom upvotes and downvotes */}
                <Typography
                  align="left"
                  sx={{ ml: 1, display: "inline", verticalAlign: "top" }}
                >
                  {bathroom.upvotes || 0}
                </Typography>
                <ThumbUpOutlinedIcon
                  sx={{ pr: 1, display: "inline", verticalAlign: "top" }}
                />

                <Typography
                  align="left"
                  sx={{ display: "inline", verticalAlign: "top" }}
                >
                  {bathroom.downvotes || 0}
                </Typography>
                <ThumbDownOutlinedIcon
                  sx={{ pr: 1, display: "inline", verticalAlign: "top" }}
                />
                <Button
                  variant="contained"
                  onClick={goToDetails}
                  sx={{
                    m: 1,
                    justifyContent: "center",
                    display: "inline-block",
                    verticalAlign: "bottom",
                  }}
                >
                  More info
                </Button>
                    
                {/* button to open directions to bathroom in Google Maps in a new tab */}
                <Avatar
                  component={Paper}
                  elevation={2}
                  sx={{
                    m: 0.5,
                    bgcolor: "#5272F2",
                    display: "inline-block",
                    verticalAlign: "bottom",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      openInNewTab(
                        `https://www.google.com/maps/dir/?api=1&destination=${bathroom.name}&origin=${origin}`
                      )
                    }
                  >
                    <DirectionsIcon sx={{ color: "#FFF6F6" }} />
                  </IconButton>
                </Avatar>
              </CardActions>
            </Collapse>
          </CardContent>
        </Card>
      </Grid2>
    </>
  );
}

export default BathroomItemMap;
