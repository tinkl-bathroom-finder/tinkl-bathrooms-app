const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/* GET route to get bathrooms by proximity to current location */
router.get('/', (req, res) => {
    console.log('req.query.lat:', req.query.lat)
    console.log('req.query.lng:', req.query.lng)
    // This uses the Haversine formula to calculate distances between coordinates. $1 is current location latitude, $2 is current location longitude.
    const query = `
    select id, name, street, city, created_at, updated_at, accessible, unisex, changing_table, distance from (
    SELECT
    id,
    name,
    street,
    city,
    created_at,
    updated_at,
    accessible,
    unisex,
    changing_table,
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
    distance ASC
  LIMIT 200;
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