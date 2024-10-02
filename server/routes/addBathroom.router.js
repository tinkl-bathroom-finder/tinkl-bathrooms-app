// https://maps.googleapis.com/maps/api/place/details/json?fields=photo,permanently_closed,wheelchair_accessible_entrance,opening_hours&place_id=ChIJ4RchXOEn9ocRBT4VNIVKbl8&key=AIzaSyBFwRK-YKSXb77BVXLDSG5koH_D1jFJ-Rk

const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const router = express.Router();

router.get('/', (req, res) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
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

  router.post('/add', rejectUnauthenticated, (req, res) => {
    console.log('req.body to add bathroom: ', req.body)
    // const query = /*sql*/`
    // INSERT INTO "restrooms"
    // ( "name", 
    // "formatted_address", 
    // "accessible", 
    // "public", 
    // "unisex", 
    // "changing_table", 
    // "single_stall", 
    // "latitude", 
    // "longitude",
    // "added_by_user")
    // VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    // RETURNING "id";`
  })

  //add user comment after creating the bathroom

  module.exports = router;