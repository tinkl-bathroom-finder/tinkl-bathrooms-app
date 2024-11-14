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
    .query(`SELECT * FROM "flagged_restrooms"`)
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
        menstrual_products,
        is_permanently_closed, 
        other_comment
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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
      req.body.menstrual_products, 
      req.body.is_closed,
      req.body.other
    ]
    await connection.query(flagChangesQuery, flagChangesValues)

    // *** restrooms PUT ***
    const markFlaggedQuery = `
      UPDATE "restrooms"
      SET "is_flagged" = TRUE
      WHERE id = $1
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
router.put('/', (req, res) => {
  const query = `
    UPDATE "restrooms"
    SET
      name = $1,
      address = $2,
      accessible = $3,
      changing_table = $4,
      unisex = $5,
      is_single_stall = $6,
      is_permanently_closed = $7,
      other_comment = $8
    WHERE id = $9
  `
  const values = [
    req.body.name, // <-- not sure if this will be called this
    req.body.address,
    req.body.accessible,
    req.body.hasChangingTable,
    req.body.isUnisex,
    req.body.isSingleStall,
    req.body.isClosed,
    req.body.otherComments
  ]
  pool
    .query(query, values)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((dbErr) => {
      console.error('flagBathroom PUT route failed:', dbErr)
      res.sendStatus(500)
    })
})

module.exports = router;
