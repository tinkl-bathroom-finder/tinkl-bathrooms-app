const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/* GET route for specific bathroom information */
router.get('/', (req, res) => {
    console.log('req.query.lat:', req.query.lat)
    console.log('req.query.lng:', req.query.lng)
    // This uses the Haversine formula to calculate distances between coordinates. $1 is current location latitude, $2 is current location longitude.
        // In this query:
        // The radians function is used to convert degrees to radians, which is required for the Haversine formula.
        // The Haversine formula is used to calculate the great-circle distance between two points on the Earth's surface.
        // The result is ordered by distance in ascending order.
        // The LIMIT 10 clause ensures that only the top 10 closest businesses are returned.
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
        6371 * acos(cos(radians($1)) * 
        cos(radians(latitude)) * 
        cos(radians(longitude) - 
        radians($2)) + 
        sin(radians($1)) * 
        sin(radians(latitude)))
    ) AS distance

  FROM
    restrooms)
  ORDER BY
    distance
  LIMIT 10;
    `
    const lat = req.query.lat
    const lng = req.query.lng
    const values = [lat, lng]

    pool.query(query, values)
    .then((dbRes) => {
      let bathroomsByDistanceList = dbRes.rows
      // gets sent to bathroomsByDistance reducer ==> action.payload
      res.send(bathroomsByDistanceList)
    })
    .catch((dbErr) => {
      console.log('fail:', dbErr)
      res.sendStatus(500)
    })
  })

module.exports = router;