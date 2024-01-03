const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const query =  
  
      `SELECT * FROM "restrooms";`
 
  pool.query(query)
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((dbErr) => {
      console.log('fail:', dbErr)
      res.sendStatus(500)
    })
})

/* GET route for specific bathroom information */
router.get('/:id', (req, res) => {
  const query = `
    SELECT
* FROM "restrooms"
WHERE "restrooms"."id"=$1
  `
  console.log('req.params', req.params)
  const values = [req.params.id]
  pool.query(query, values)
  .then((dbRes) => {
    let theBathroom = dbRes.rows
    console.log('dbRes.rows', dbRes.rows)
    // where is this getting sent to?? I need to get this info 
    res.send(theBathroom)
  })
  .catch((dbErr) => {
    console.log('fail:', dbErr)
    res.sendStatus(500)
  })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
