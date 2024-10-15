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


router.post('/add', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    // Establishes a longstanding connection to our database:
    // BEGIN the SQL Transaction:
    await connection.query('BEGIN;');
    let info = req.body.bathroomToAdd
    let hours = req.body.bathroomHours.result.opening_hours
    let addressArray = info.formatted_address.split(", ")
    //address array: [ '301 4th Ave S #577', 'Minneapolis', 'MN 55415', 'USA' ]
    // this is a workaround for now, a more permanent fix would be to change the form on the modal
    let street = addressArray[0]
    let city = addressArray[1]
    let state = addressArray[2].slice(0, 2)
    let country = addressArray[3]
    // create bathroom record
    // SHOULD THE ADMIN COMMENT GO HERE AS WELL??
    const restroomsQuery = `
          INSERT INTO "restrooms"
          ("name", "street", "city", "state", "accessible", "unisex", "latitude", "longitude", "country", "changing_table", "is_single_stall", "place_id", "added_by_user", "admin_comment")
          VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          RETURNING "id"
          `;
    const restroomsValues = [info.name, street, city, state, info.accessible, info.unisex, info.latitude, info.longitude, country, info.changing_table, info.single_stall, info.placeID, req.user.id, info.commentForAdmin]
    // query returns id from the inserted restroom
    const returnedRestroomIdRows = await connection.query(
      restroomsQuery,
      restroomsValues
    );
    // END RESTROOM POST

    // should give us the posted bathrooms id number
    const restroom_id = returnedRestroomIdRows.rows[0].id;

    //create hours record
    if (hours) {
    let business_status = req.body.bathroomHours.status
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
      } else if (hours.periods[i].close.day === 0) {
        day_0_close = hours.periods[i].close.time
      } else if (hours.periods[i].open.day === 1) {
        day_1_open = hours.periods[i].open.time
      } else if (hours.periods[i].close.day === 1) {
        day_1_close = hours.periods[i].close.time
      } else if (hours.periods[i].open.day === 2) {
        day_2_open = hours.periods[i].open.time
      } else if (hours.periods[i].close.day === 2) {
        day_2_close = hours.periods[i].close.time
      } else if (hours.periods[i].open.day === 3) {
        day_3_open = hours.periods[i].open.time
      } else if (hours.periods[i].close.day === 3) {
        day_3_close = hours.periods[i].close.time
      } else if (hours.periods[i].open.day === 4) {
        day_4_open = hours.periods[i].open.time
      } else if (hours.periods[i].close.day === 4) {
        day_4_close = hours.periods[i].close.time
      } else if (hours.periods[i].open.day === 5) {
        day_5_open = hours.periods[i].open.time
      } else if (hours.periods[i].close.day === 5) {
        day_5_close = hours.periods[i].close.time
      } else if (hours.periods[i].open.day === 6) {
        day_6_open = hours.periods[i].open.time
      } else if (hours.periods[i].close.day === 6) {
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
    
      const hoursQuery = `
      INSERT INTO "opening_hours"
      ("restroom_id", "business_status", "weekday_text", "day_0_open", "day_0_close", "day_1_open", "day_1_close", "day_2_open", "day_2_close", "day_3_open", "day_3_close", "day_4_open", "day_4_close", "day_5_open", "day_5_close", "day_6_open", "day_6_close")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      `;
      const hoursValues = [restroom_id, business_status, weekday_text, day_0_open, day_0_close, day_1_open, day_1_close, day_2_open, day_2_close, day_3_open, day_3_close, day_4_open, day_4_close, day_5_open, day_5_close, day_6_open, day_6_close]
      // second query inserts hours info into hours table with the returned restroom_id from the previous query
      const hoursResult = await connection.query(
        hoursQuery,
        hoursValues
      );
    }
    // END HOURS POST

    //create comment record (if any)
    if (info.comment) {
      const commentsQuery = `
            INSERT INTO "comments"
            ("content", "restroom_id", "user_id")
            VALUES
            ($1, $2, $3)
            `;
      const commentsValues = [info.comment, restroom_id, req.user.id]
      const commentsResult = await connection.query(
        commentsQuery,
        commentsValues
      );
    }
    // if all posts are successful, commit those changes to the tables
    await connection.query('COMMIT;');
    res.sendStatus(201)
  } catch (error) {
    console.log("Error in create bathroom", error);
    await connection.query('ROLLBACK;');
    res.sendStatus(500);
  } finally {
    // Close the connection
    connection.release();
  }
});

router.get("/approve", (req, res) => {
  // GET bathrooms to approve route
  const query = /*sql*/ `
  SELECT 
  "restrooms".*,
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
   "opening_hours".day_6_close
FROM "restrooms"
LEFT JOIN "opening_hours" ON "restrooms".id="opening_hours".restroom_id
WHERE "restrooms".is_approved = FALSE
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
   "opening_hours".day_6_close;`;

  pool
    .query(query)
    .then((dbRes) => {
      console.log("dbRes.rows in GET /add/approve route:", dbRes);
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});
module.exports = router;