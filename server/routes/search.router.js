const express = require('express');
const pool = require('../modules/pool');
// require('dotenv').config();
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  console.log("Search API - req.query: ", req.query.convertedAddress);

  axios({
    method: "GET",
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${req.query.convertedAddress}`
  })

    .then((response) => {
      console.log('Geocode API Response', response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log("Error in get SEARCH", error);
    })

});

router.get('/testSearch', (req, res) => {
  console.log('Test Search', req.query.convertedAddress);
  res.sendStatus(200);
})

module.exports = router;
