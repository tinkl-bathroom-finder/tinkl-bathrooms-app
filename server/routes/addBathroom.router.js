// https://maps.googleapis.com/maps/api/place/details/json?fields=photo,permanently_closed,wheelchair_accessible_entrance,opening_hours&place_id=ChIJ4RchXOEn9ocRBT4VNIVKbl8&key=AIzaSyBFwRK-YKSXb77BVXLDSG5koH_D1jFJ-Rk

const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const router = express.Router();

router.get('/', async (req, res) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    console.log("Search API - req.query: ", req.query.placeID);
  
    await axios({
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/place/details/json?fields=photo,permanently_closed,wheelchair_accessible_entrance,opening_hours&place_id=${req.query.placeID}&key=${apiKey}`
    })
      .then((res) => {
       //create bathroom record
        const sqlQuery = `
          UPDATE "restrooms"
              SET "place_id"=$1, "formatted_address"=$3
              WHERE "id"=$2
          `;
          const sqlValues = [response.data.results[0].place_id, restroom_id, response.data.results[0].formatted_address];
          pool.query(sqlQuery, sqlValues)
          })
          .then((response) => {
              //create hours record
                const sqlQuery = `
                UPDATE "restrooms"
                    SET "place_id"=$1, "formatted_address"=$3
                    WHERE "id"=$2
                `;
                const sqlValues = [response.data.results[0].place_id, restroom_id, response.data.results[0].formatted_address];
                pool.query(sqlQuery, sqlValues)
              })
              .then((response) => {
                //create comment record (if any)
                  const sqlQuery = `
                  UPDATE "restrooms"
                      SET "place_id"=$1, "formatted_address"=$3
                      WHERE "id"=$2
                  `;
                  const sqlValues = [response.data.results[0].place_id, restroom_id, response.data.results[0].formatted_address];
                  pool.query(sqlQuery, sqlValues)
                })
              .catch((error) => {
              console.log("Error in geocode API", error);
              })
          .catch((error) => {
            console.log("Error in geocode API", error);
          })
      .catch((error) => {
        console.log("Error in get search", error);
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
  //add open hours after creating the bathroom
  //add user comment after creating the bathroom

  module.exports = router;