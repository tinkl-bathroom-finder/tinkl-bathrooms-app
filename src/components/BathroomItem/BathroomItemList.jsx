import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
  CardActions,
  IconButton,
  Grid,
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

function BathroomItemList({ bathroom, origin }) {
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

  // console.log('bathroom: ', bathroom)

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
            maxHeight: '200px',
            height: expanded ? "auto" : "30vw",
            paddingLeft: 0,
            // borderRadius: '10px',
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
                <Typography
                  variant="h6"
                  gutterBottom
                  align="right"
                  sx={{ mr: 1, mt: 0.5 }}
                >
                  {bathroom.unisex ? <TransgenderOutlinedIcon /> : ""}
                  {bathroom.changing_table ? <BabyChangingStationOutlinedIcon /> :  ""}
                  {bathroom.accessible ? <AccessibleForwardOutlinedIcon /> : ""}
                  {bathroom.is_single_stall ? <Man4Icon /> : ""}
                </Typography>

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

                {/* chevron to expand bathroom item card */}
                <Typography
                  variant="h6"
                  align="right"
                  color={"grey"}
                  sx={{ mr: 1, mt: 2 }}
                >
                  <ExpandMoreIcon />
                </Typography>
              </>
            }
          />
          <CardContent sx={{ p: 0 }}>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              {/* when bathroom info was last updated */}
              <Typography
                sx={{ fontSize: 14, mr: 2, ml: 2 }}
                color="text.secondary"
                align="left"
              >
                {`Updated ${stringifyDate(bathroom.updated_at)}`}
              </Typography>
              {/* moves chevron to right */}
              <CardActions>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                  sx={{ m: 0, p: 0 }}
                />

                {/* <BusinessHours bathroom={bathroom}/> */}

                {/* bathroom upvotes and downvotes */}
                <Typography align="left" sx={{ mr: 2 }}>
                  {bathroom.upvotes || 0}
                  <ThumbUpOutlinedIcon sx={{ pr: 1, ml: 0.5 }} />
                  {bathroom.downvotes || 0}
                  <ThumbDownOutlinedIcon sx={{ pr: 1, ml: 0.5 }} />
                </Typography>

                <Button variant="contained" onClick={goToDetails}>
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

export default BathroomItemList;
