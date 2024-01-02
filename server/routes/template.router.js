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
  // default lat and lng will need to be replaced by {lat} and {lng}
  // and calculated from inputted address at some point
//   `
//     SELECT 
// id, 
// (
//    3959 *
//    acos(cos(radians(44.978145599365234)) * 
//    cos(radians(lat)) * 
//    cos(radians(lng) - 
//    radians(-93.26353454589844)) + 
//    sin(radians(44.978145599365234)) * 
//    sin(radians(lat )))
// ) AS distance 
// FROM "restrooms"
// HAVING distance < 100 
// ORDER BY distance
// LIMIT 10;
//   `
 
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
  console.log('req.params.id:', req.params.id)
  const values = [req.params.id]
  pool.query(query, values)
  .then((dbRes) => {
    let theBathroom = dbRes.rows
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
