const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET all bathrooms route
  const query = `SELECT * FROM "restrooms"
  WHERE "is_removed"=FALSE;`;

  pool
    .query(query)
    .then((dbRes) => {
      console.log("dbRes.rows in GET /all route:", dbRes);
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

// PUT route for admin to soft "delete" a bathroom AKA turn "is_removed" to true
router.put("/:id", (req, res) => {
  console.log("req.params.id from put route: ", req.params.id);
  const sqlQuery = `
  UPDATE "restrooms"
      SET "is_removed"=TRUE
      WHERE "id"=$1
  `;
  const sqlValues = [req.params.id];
  pool
    .query(sqlQuery, sqlValues)
      // this gets sent to deleteBathroom.saga.js
    .then((dbResult) => res.sendStatus(201))
    .catch((error) => {
      console.log("Error removing bathroom:", error);
      res.sendStatus(500);
    })

});

// DELETE route for admin to permanently a bathroom from the database
router.delete('/:id', (req, res) => {
  console.log("req.params.id from delete route: ", req.params.id);
  const sqlQuery = `
  DELETE from "restrooms"
  WHERE "id" = $1
  `
  const sqlValues = [req.params.id]
  pool
    .query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(201)
    })
    .catch((dbError) => {
      console.log('DELETE /bathrooms/:id failed', dbError)
      res.sendStatus(500)
    })
})

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
