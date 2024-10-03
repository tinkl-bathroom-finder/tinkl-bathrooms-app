// https://maps.googleapis.com/maps/api/place/details/json?fields=photo,permanently_closed,wheelchair_accessible_entrance,opening_hours&place_id=ChIJ4RchXOEn9ocRBT4VNIVKbl8&key=AIzaSyBFwRK-YKSXb77BVXLDSG5koH_D1jFJ-Rk

const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  console.log('in add bathroom get route');
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  console.log("Add Bathroom - req.query: ", req.query);
  axios({
    method: "GET",
    url: `https://maps.googleapis.com/maps/api/place/details/json?fields=photo,permanently_closed,wheelchair_accessible_entrance,opening_hours&place_id=${req.query.placeID}&key=${apiKey}`
  }).then((response) => {
    console.log('Places API Response with hours', response.data);
    res.send(response.data);
  })
    .catch((error) => {
      console.log("Error in get places", error);
    })
});


router.post('/add', rejectUnauthenticated, (req, res) => {
  //create bathroom record
  //SHOULD THE ADMIN COMMENT GO HERE AS WELL??
  const sqlQuery = `
        INSERT INTO "restrooms"
        ("")
        VALUES
        ($1)
        RETURNING "id"
        `;
  sqlValues = [bathroom]
  pool.query(sqlQuery, sqlValues)
    .then((response) => {
      //create hours record
      const sqlQuery = `
                INSERT INTO "opening_hours"
                ("restroom_id", "business_status", "weekday_text", "day_0_open", "day_0_close", "day_1_open", "day_1_close", "day_2_open", "day_2_close", "day_3_open", "day_3_close", "day_4_open", "day_4_close", "day_5_open", "day_5_close", "day_6_open", "day_6_close")
                VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                `;
      sqlValues = [restroom_id, business_status, weekday_text, day_0_open, day_0_close, day_1_open, day_1_close, day_2_open, day_2_close, day_3_open, day_3_close, day_4_open, day_4_close, day_5_open, day_5_close, day_6_open, day_6_close]
      pool.query(sqlQuery, sqlValues)
    })
    .then((response) => {
      //create comment record (if any)
      if (req.body.comment){
      const sqlQuery = `
                  INSERT INTO "comments"
                  ("")
                  VALUES
                  ($1)
                  `;
      sqlValues = [values]
      pool.query(sqlQuery, sqlValues)
    }
    })
    .catch((error) => {
      console.log("Error in create bathroom comment", error);
    })
    .catch((error) => {
      console.log("Error in create hours", error);
    })
    .catch((error) => {
      console.log("Error in get create bathroom", error);
    })
});

// router.post('/add', rejectUnauthenticated, (req, res) => {
//   console.log('req.body to add bathroom: ', req.body)
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
// })
//add open hours after creating the bathroom
//add user comment after creating the bathroom

module.exports = router;