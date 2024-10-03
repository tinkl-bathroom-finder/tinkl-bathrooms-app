// https://maps.googleapis.com/maps/api/place/details/json?fields=photo,permanently_closed,wheelchair_accessible_entrance,opening_hours&place_id=ChIJ4RchXOEn9ocRBT4VNIVKbl8&key=AIzaSyBFwRK-YKSXb77BVXLDSG5koH_D1jFJ-Rk

const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  console.log("Get Bathroom hours - req.query: ", req.query);
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
  console.log("Add bathroom - req.body", req.body);
  let info = req.body.bathroomToAdd
  let addressArray = info.formatted_address.split(", ")
  //address array: [ '301 4th Ave S #577', 'Minneapolis', 'MN 55415', 'USA' ]
  // this is a workaround for now, a more permanent fix would be to change the form on the modal
  let street = addressArray[0]
  let city = addressArray[1]
  let state = addressArray[2].slice(0,2)
  let country = addressArray[3]
  //EXAMPLE REQ.BODY
  // bathroomToAdd: {
  //   placeID: 'ChIJr3dcDv0k9ocRTjNHswleYU8',
  //   name: 'Prime Digital Academy',
  //   formatted_address: '301 4th Ave S #577, Minneapolis, MN 55415, USA',
  //   accessible: false,
  //   is_public: false,
  //   unisex: false,
  //   changing_table: false,
  //   single_stall: false,
  //   latitude: 44.978031,
  //   longitude: -93.26350099999999,
  //   user_id: 7,
  //   commentForAdmin: '',
  //   comment: ''
  // },
  // bathroomHours: {
  //   opening_hours: [Object],
  //   photos: [Array],
  //   wheelchair_accessible_entrance: true
  // }

  // create bathroom record
  // SHOULD THE ADMIN COMMENT GO HERE AS WELL??
  const sqlQuery = `
        INSERT INTO "restrooms"
        ("name", "street", "city", "state", "accessible", "unisex", "latitude", "longitude", "country", "changing_table", "is_single_stall", "place_id")
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING "id"
        `;
  sqlValues = [info.name, street, city, state, info.accessible, info.unisex, info.latitude, info.longitude, country, info.changing_table, info.single_stall, info.placeID]
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