const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const checkAdminAuth = require("../modules/checkAdminAuth")
const router = express.Router();
const axios = require('axios');

// ***** /flag ROUTES *****

// get route for flagged bathrooms suggested changes
router.get('/', rejectUnauthenticated, checkAdminAuth, (req, res) => {
  pool
    .query(/*sql*/`
      SELECT 
      "flagged_restrooms".name AS "proposed_name",
      "flagged_restrooms".street AS "proposed_street",
      "flagged_restrooms".city AS "proposed_city",
      "flagged_restrooms".state AS "proposed_state",
      "flagged_restrooms".accessible AS "proposed_accessible",
      "flagged_restrooms".changing_table AS "proposed_changing_table",
      "flagged_restrooms".unisex AS "proposed_unisex",
      "flagged_restrooms".is_single_stall AS "proposed_is_single_stall",
      "flagged_restrooms".is_permanently_closed AS "proposed_is_permanently_closed",
      "flagged_restrooms".restroom_id,
      "flagged_restrooms".other_comment,
      "flagged_restrooms".created_at,
      "restrooms".name AS "original_name",
      "restrooms".street AS "original_street",
      "restrooms".city AS "original_city",
      "restrooms".state AS "original_state",
      "restrooms".accessible AS "original_accessible",
      "restrooms".changing_table AS "original_changing_table",
      "restrooms".unisex AS "original_unisex",
      "restrooms".is_single_stall AS "original_is_single_stall",
      "user".username
      from "flagged_restrooms"
      LEFT JOIN "user" on "user".id = "flagged_restrooms".user_id
      LEFT JOIN "restrooms" on "restrooms".id = "flagged_restrooms".restroom_id;
      `)
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((dbErr => {
      console.error('flagBathroom GET route failed:', dbErr)
    }))
})

// when a bathroom is flagged, the suggested details are posted
// to the flagged_restrooms table and marked flagged in the restrooms table
router.post('/', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN;');

    // *** flagged_restrooms POST ***
    const flagChangesQuery = `
      INSERT INTO "flagged_restrooms" (
        restroom_id, 
        user_id, 
        name, 
        street, 
        city,
        state,
        accessible, 
        changing_table, 
        unisex, 
        is_single_stall,
        is_permanently_closed, 
        other_comment
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
    `
    const flagChangesValues = [
      req.body.restroom_id, 
      req.body.user_id, 
      req.body.name,
      req.body.street, 
      req.body.city, 
      req.body.state, 
      req.body.accessible, 
      req.body.changing_table, 
      req.body.unisex, 
      req.body.is_single_stall,
      req.body.is_closed,
      req.body.other
    ]
    await connection.query(flagChangesQuery, flagChangesValues)

    // *** restrooms PUT ***
    const markFlaggedQuery = `
      UPDATE "restrooms"
      SET "is_flagged" = TRUE
      WHERE id = $1;
    `
    const markFlaggedValues = [req.body.restroom_id]
    await connection.query(markFlaggedQuery, markFlaggedValues)

    // commit changes
    await connection.query('COMMIT;');
    res.sendStatus(201)
  }
  catch (error) {
    console.error('flagBathroom POST route failed:', error)
    await connection.query('ROLLBACK;');
    res.sendStatus(500)
  } finally {
    connection.release()
  }
})

// when the flagged bathroom changes are approved by admin, the restrooms
// table is updated with those changes
router.put('/', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN;');

  const query = `
    UPDATE "restrooms"
    SET
      name = $1,
      street = $2,
      city = $3,
      state = $4,
      accessible = $5,
      changing_table = $6,
      unisex = $7,
      is_single_stall = $8,
      is_permanently_closed = $9,
      other_comment = $10,
      is_flagged = FALSE,
    WHERE id = $11;
  `
  const values = [
    req.body.name, // <-- not sure if this will be called this
    req.body.street,
    req.body.city,
    req.body.state,
    req.body.accessible,
    req.body.hasChangingTable,
    req.body.isUnisex,
    req.body.isSingleStall,
    req.body.isClosed,
    req.body.otherComments,
    req.body.restroom_id
  ]
  await connection.query(query, values)

  const query2 = `
      UPDATE "flagged_restrooms"
      SET "is_resolved" = TRUE
      WHERE restroom_id = $1;
  `

  const values2 = [req.body.restroom_id]
  await connection.query(query2, values2)

  await connection.query('COMMIT;')
  res.sendStatus(201)
  } catch (error) {
    console.error('flagBathroom PUT route failed:', error)
    await connection.query('ROLLBACK;');
    res.sendStatus(500)
  } finally {
    connection.release();
  }
})

module.exports = router;
