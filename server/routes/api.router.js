const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

//Essie's old api route

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
  // query for which restrroms to get geocoding info for
  const query = /*sql*/`
  SELECT *
  FROM "restrooms"
  WHERE "restrooms".is_removed = FALSE AND "restrooms".id > 119 AND "restrooms".id < 150
  ORDER BY id;`
  pool.query(query)
    .then(async (dbRes) => {
      // db_bathrooms array of bathroom objects from db
      let db_bathrooms = dbRes.rows
      console.log('db bathrooms:', db_bathrooms);
      for (let i = 0; i < db_bathrooms.length; i++) {
        let restroom_id = db_bathrooms[i].id
        let apiGeocode = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCXfizt8q0KOhephD9TP55AqYdnUFNp1H0&address=${db_bathrooms[i].name.split(" ").join("%20")}%20${db_bathrooms[i].street.split(" ").join("%20")}%20${db_bathrooms[i].city.split(" ").join("%20")}%20${db_bathrooms[i].state.split(" ").join("%20")}`
        console.log('search string:', apiGeocode);
        await axios({
          method: "GET",
          url: `${apiGeocode}`
        })
          .then((response) => {
            console.log('place id:', response.data.results[0].place_id);
            if (response.data.results[0].place_id) {
              const sqlQuery = `
              UPDATE "restrooms"
                  SET "google_place_id"=$1
                  WHERE "id"=$2
              `;
              const sqlValues = [response.data.results[0].place_id, restroom_id];
              pool.query(sqlQuery, sqlValues)
            }
            // not sure if we need this?
            else { res.sendStatus(200) }
          })
          .catch((error) => {
            console.log("Error in geocode API", error);
          })
      }
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

//goop for places API
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

module.exports = router;