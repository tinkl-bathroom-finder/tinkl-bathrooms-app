import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  IconButton,
  CardMedia,
} from "@mui/material";

import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import BabyChangingStationOutlinedIcon from '@mui/icons-material/BabyChangingStationOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import TransgenderOutlinedIcon from '@mui/icons-material/TransgenderOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import Table from "react-bootstrap/Table";
import { ConstructionOutlined, More } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

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

function BathroomItem({ bathroom, origin }) {
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
  }

  // formats inserted_at timestamp as readable string
  const stringifyDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const stringifiedDate = date.toLocaleDateString("en-us", options);
    return stringifiedDate;
  };

  return (
    <>


      <Box
        key={bathroom.id}
        width="100%"
        // padding-left (https://mui.com/system/spacing/)
        pl="20px"
      >
        <Card
          sx={{
            mb: "20px"
          }}
        >
                  {/* when bathroom info was last updated */}
            <Typography sx={{ fontSize: 14,
            mr: 2, mt: 3 }} color="text.secondary" align="right">
              {"Updated " + stringifyDate(bathroom.updated_at)}
            </Typography>

          <CardHeader
            title={bathroom.name}
            subheader={bathroom.street + ", " + bathroom.city + ", MN"}
          >
          </CardHeader>
          <CardMedia />
          <CardContent>

            <CardActions>

            </CardActions>

            {/* icons to show if bathrooms is all-gender, has changing table, is wheelchair accessible */}
            <Typography variant="h5" gutterBottom>{bathroom.unisex ? <TransgenderOutlinedIcon/>: ''}{bathroom.changing_table ? <BabyChangingStationOutlinedIcon/>: ''}{bathroom.accessible ? <AccessibleForwardOutlinedIcon/>: ''}</Typography>

            {/* bathroom upvotes and downvotes */}
            <Typography align="right">
              {bathroom.upvotes || 0}
              <ThumbUpOutlinedIcon sx={{ pr: 1}}/>
            {(bathroom.downvotes) || 0}
            <ThumbDownOutlinedIcon sx={{ pr: 1}}/>
            </Typography>



          </CardContent>
{/* moves chevron to right */}
          <CardActions disableSpacing>
            <Button onClick={goToDetails}>More info</Button>
            <ExpandMore></ExpandMore>    
                      {/* 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 make this link to Google Maps directions! */}
              <IconButton
               onClick={() => openInNewTab(`https://www.google.com/maps/dir/?api=1&destination=${bathroom.name}&origin=${origin}`)}
              >
                <NearMeOutlinedIcon />
              </IconButton>
            {/* distance from current/searched location */}
            <Typography align="right" color="text.secondary"  sx={{
            mr: 2}} >
              {bathroom.distance ? `${bathroom.distance.toFixed(2)} mi` : ""}
            </Typography>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Comments:</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </>
  );
}

export default BathroomItem;
