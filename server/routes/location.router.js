const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/* GET route to get bathrooms by proximity to current location */
router.get('/', (req, res) => {
  console.log('req.query.lat:', req.query.lat)
  console.log('req.query.lng:', req.query.lng)
  // This uses the Haversine formula to calculate distances between coordinates. $1 is current location latitude, $2 is current location longitude.
  const query = /*sql*/`
	    select 
      id, 
      name, 
      street, 
      city, 
      created_at, 
      updated_at, 
      accessible, 
      unisex, 
      changing_table,
      COALESCE("votes_query"."upvotes", 0) AS "upvotes", 
      COALESCE("votes_query"."downvotes", 0) AS "downvotes",
          (
              6371 * acos(cos(radians($1)) * 
              cos(radians(latitude)) * 
              cos(radians(longitude) - 
              radians($2)) + 
              sin(radians($1)) * 
              sin(radians(latitude)))
          ) AS distance  from restrooms 
      LEFT JOIN (
            SELECT 
              "restroom_id", 
              SUM("upvote") AS "upvotes",
              SUM("downvote") AS "downvotes"
            FROM "restroom_votes"
            GROUP BY "restroom_id"
          ) 
          AS "votes_query" ON "restrooms"."id" = "votes_query"."restroom_id"
          WHERE "restrooms".is_removed = FALSE
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