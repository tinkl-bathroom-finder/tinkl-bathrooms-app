const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/* GET route for specific bathroom information */
router.get('/', (req, res) => {
    console.log('req:', req)
    // This uses the Haversine formula to calculate distances between coordinates. Assuming you have a table named businesses with columns business_id, latitude, and longitude, and you want to find the closest businesses to a given location with coordinates (given_latitude, given_longitude), the SQL query would look something like this:
    const query = `
    select id, name, street, city, distance from (
    SELECT
    id,
    name,
    street,
    city,
    latitude,
    longitude,
    (
        6371 * acos(cos(radians(44.978145599365234)) * 
        cos(radians(latitude)) * 
        cos(radians(longitude) - 
        radians(-93.26353454589844)) + 
        sin(radians(44.978145599365234)) * 
        sin(radians(latitude)))
    ) AS distance

  FROM
    restrooms)
  ORDER BY
    distance
  LIMIT 10;
    `
    // In this query:
        // The radians function is used to convert degrees to radians, which is required for the Haversine formula.
        // The Haversine formula is used to calculate the great-circle distance between two points on the Earth's surface.
        // The result is ordered by distance in ascending order.
        // The LIMIT 10 clause ensures that only the top 10 closest businesses are returned.
    pool.query(query
        // , values
        )
    .then((dbRes) => {
      let bathroomsByDistanceList = dbRes.rows
      console.log('dbRes.rows', dbRes.rows)
      // gets sent to bathroomsByDistance reducer ==> action.payload
      res.send(bathroomsByDistanceList)
    })
    .catch((dbErr) => {
      console.log('fail:', dbErr)
      res.sendStatus(500)
    })
  })

module.exports = router;