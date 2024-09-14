// https://maps.googleapis.com/maps/api/place/details/json?fields=photo,permanently_closed,wheelchair_accessible_entrance,opening_hours&place_id=ChIJ4RchXOEn9ocRBT4VNIVKbl8&key=AIzaSyBFwRK-YKSXb77BVXLDSG5koH_D1jFJ-Rk

const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get('/', (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    console.log("Search API - req.query: ", req.query.placeID);
  
    axios({
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/place/details/json?fields=photo,permanently_closed,wheelchair_accessible_entrance,opening_hours&place_id=${req.query.placeID}&key=${apiKey}`
    })
  
      .then((response) => {
        console.log('Place Details API Response', response.data);
        res.send(response.data);
      })
      .catch((error) => {
        console.log("Error in get search", error);
      })
  
  });

  module.exports = router;