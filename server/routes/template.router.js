const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const query = `
    SELECT * FROM "restrooms";
  `
  pool.query(query)
    .then((dbRes) => {
      res.send(dbRes.rows)
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
