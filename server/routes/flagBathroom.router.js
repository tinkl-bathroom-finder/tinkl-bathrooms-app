const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const router = express.Router();
const axios = require('axios');

// get route for flagged bathrooms suggested changes
router.get('/', (req, res) => {
  pool
    .query`GET * FROM "flagged_restrooms"`
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((dbErr => {
      console.error('flagBathroom GET route failed:', dbErr)
    }))
})

// when a bathroom is flagged, the suggested details are posted
// to the flagged_bathroom table and marked flagged in the restrooms table
router.post('/', (req, res) => {
  
})

// when the flagged bathroom changes are approved by admin, the restrooms
// table is updated with those changes
router.put('/', (req, res) => {

})

module.exports = router;