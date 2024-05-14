const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// router.get('/', (req,res) => {
//     console.log('req.query.perPage: ', req.query.perPage)
//     console.log('req.query.perPage: ', req.query.pageNumber)
//     // axios get request to Refuge API to get bathrooms in Minneapolis? Do I even need this if I'm directly making the http get request from my saga?
//     axios({
//         method: "GET",
//         url: `https://refugerestrooms.org/api/v1/restrooms/by_location?lat=44.977753&lng=-93.2650108&search=Minneapolis%2C+Minnesota%2C&per_page=${req.query.perPage}&page=${req.query.pageNumber}`
//       })
//       .then ((response)=>{
//         res.send(response.data);
//       })
//       .catch((error)=>{
//         console.log("Error in get SEARCH", error);
//       })
// })


/**
 * GOOGLE PLACES API
 */
router.get("/", (req, res) => {
  // GET all bathrooms route
  const query = /*sql*/`
  SELECT *
FROM "restrooms"
WHERE "restrooms".is_removed = FALSE
ORDER BY id
LIMIT 1;`
  pool.query(query)
    .then((dbRes) => {
      let db_bathrooms = dbRes.rows
      // console.log('db bathrooms:', db_bathrooms);
      for (let i = 0; i < db_bathrooms.length; i++) {
        restroom_id = db_bathrooms[i].id
        apiGeocode = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCXfizt8q0KOhephD9TP55AqYdnUFNp1H0&address=${db_bathrooms[i].name.split(" ").join("%20")}%20${db_bathrooms[i].street.split(" ").join("%20")}%20${db_bathrooms[i].city.split(" ").join("%20")}%20${db_bathrooms[i].state.split(" ").join("%20")}`
        console.log('serach string:', apiGeocode);
        axios({
          method: "GET",
          url: `${apiGeocode}`
        })

          .then((response) => {
            console.log('place id', response.data.results[0].place_id);
            
            const sqlQuery = `
              UPDATE "restrooms"
                  SET "google_place_id"=$1
                  WHERE "id"=$2
              `;
            const sqlValues = [response.data.results[0].place_id, restroom_id];
            pool
              .query(sqlQuery, sqlValues)
              // this gets sent to bathroom.saga.js
              .then((dbResult) => res.send({ restroom_id: restroom_id, place_id: response.data.results[0].place_id }))
              .catch((error) => {
                console.log("Error adding google place id to bathroom:", error);
                res.sendStatus(500);
              });
          })
          // .then((response) => {
          //   let place_id = response.data.results[0].place_id
          //   console.log('placeID from Geocoding:', response.data.results[0].place_id);
          //   axios({
          //     method: "GET",
          //     url: `https://places.googleapis.com/v1/places/${place_id}?fields=*&key=AIzaSyDwUFUMBNNbnaNJQjykE2YU6gnk-s5w5mo`
          //   })
          //     .then((response) => {
          //       console.log('info from place API:', response.data);
          //     })
          //     .catch((error) => {
          //       console.log("Error in place API", error);
          //     })
          // })
          .catch((error) => {
            console.log("Error in geocode API", error);
          })
      }
      // res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;