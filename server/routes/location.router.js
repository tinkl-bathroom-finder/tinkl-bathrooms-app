const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/* GET route to get bathrooms by proximity to current location */
router.get("/", (req, res) => {
  console.log("req.query.lat:", req.query.lat);
  console.log("req.query.lng:", req.query.lng);
  // This uses the Haversine formula to calculate distances between coordinates. $1 is current location latitude, $2 is current location longitude.
  const query = /*sql*/ `
  	    SELECT 
      "restrooms".id, 
      "restrooms".name, 
      "restrooms".street, 
      "restrooms".city, 
      "restrooms".created_at, 
      "restrooms".updated_at, 
      "restrooms".accessible, 
      "restrooms".unisex, 
      "restrooms".changing_table,
   "opening_hours".weekday_text,
   "opening_hours".day_0_open,
   "opening_hours".day_0_close,
   "opening_hours".day_1_open,
   "opening_hours".day_1_close,
   "opening_hours".day_2_open,
   "opening_hours".day_2_close,
   "opening_hours".day_3_open,
   "opening_hours".day_3_close,
   "opening_hours".day_4_open,
   "opening_hours".day_4_close,
   "opening_hours".day_5_open,
   "opening_hours".day_5_close,
   "opening_hours".day_6_open,
   "opening_hours".day_6_close,
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
      LEFT JOIN "opening_hours" ON "restrooms".id="opening_hours".restroom_id
          WHERE "restrooms".is_removed = FALSE
   GROUP BY "restrooms".id, "opening_hours".weekday_text, 
   "opening_hours".day_0_open,
   "opening_hours".day_0_close,
   "opening_hours".day_1_open,
   "opening_hours".day_1_close,
   "opening_hours".day_2_open,
   "opening_hours".day_2_close,
   "opening_hours".day_3_open,
   "opening_hours".day_3_close,
   "opening_hours".day_4_open,
   "opening_hours".day_4_close,
   "opening_hours".day_5_open,
   "opening_hours".day_5_close,
   "opening_hours".day_6_open,
   "opening_hours".day_6_close,
   "votes_query".upvotes,
   "votes_query".downvotes
  ORDER BY
    distance ASC
  LIMIT 200;
    `;
  const lat = req.query.lat;
  const lng = req.query.lng;
  const values = [lat, lng];

  pool
    .query(query, values)
    .then((dbRes) => {
      let bathroomsByDistanceList = dbRes.rows;
      // gets sent to bathroomsByDistance reducer ==> action.payload
      res.send(bathroomsByDistanceList);
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;
