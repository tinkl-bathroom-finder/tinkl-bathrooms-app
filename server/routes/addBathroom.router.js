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
  let hours = req.body.bathroomHours.result.opening_hours
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
      let business_status = req.body.bathroomHours.status
      let restroom_id = response.rows
      let weekday_text = ''
      let day_0_open = null
      let day_0_close = null
      let day_1_open = null
      let day_1_close = null
      let day_2_open = null
      let day_2_close = null
      let day_3_open = null
      let day_3_close = null
      let day_4_open = null
      let day_4_close = null
      let day_5_open = null
      let day_5_close = null
      let day_6_open = null
      let day_6_close = null

      let i = 0
        while (i < hours.periods.length) {
          if (hours.periods[i].open.day === 0) {
            day_0_open = hours.periods[i].open.time
            day_0_close = hours.periods[i].close.time
          } else if (hours.periods[i].open.day === 1) {
            day_1_open = hours.periods[i].open.time
            day_1_close = hours.periods[i].close.time
          } else if (hours.periods[i].open.day === 2) {
            day_2_open = hours.periods[i].open.time
            day_2_close = hours.periods[i].close.time
          } else if (hours.periods[i].open.day === 3) {
            day_3_open = hours.periods[i].open.time
            day_3_close = hours.periods[i].close.time
          } else if (hours.periods[i].open.day === 4) {
            day_4_open = hours.periods[i].open.time
            day_4_close = hours.periods[i].close.time
          } else if (hours.periods[i].open.day === 5) {
            day_5_open = hours.periods[i].open.time
            day_5_close = hours.periods[i].close.time
          } else if (hours.periods[i].open.day === 6) {
            day_6_open = hours.periods[i].open.time
            day_6_close = hours.periods[i].close.time
          }
          i++;
        }
        for (let i = 0; i < hours.weekday_text.length; i++) {
          if (i < hours.weekday_text.length - 1) {
            weekday_text += `${hours.weekday_text[i]}, `
          } else if (i === hours.weekday_text.length - 1) {
            weekday_text += `${hours.weekday_text[i]}`
          }
        }
      
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
        if (info.comment){
        const sqlQuery = `
                    INSERT INTO "comments"
                    ("content", "restroom_id", "user_id")
                    VALUES
                    ($1 $2, $3)
                    `;
        sqlValues = [info.comment, restroom_id, req.user.id]
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