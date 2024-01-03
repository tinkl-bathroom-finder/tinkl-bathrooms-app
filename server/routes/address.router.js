const express = require('express');
const pool = require('../modules/pool');
require('dotenv').config();
const router = express.Router();
const axios = require('axios');

router.get('/search',(req,res)=>{
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    console.log("req.params.search: ",req.params.id);
    axios({
      method: `GET`,
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}address=3446%20Columbus%20Ave%20Minneapolis%20MN`
    })
  
    .then ((response)=>{
      res.send(response.data);
    })
    .catch((error)=>{
      console.log("Error in get SEARCH", error);
    })
  
  })

  module.exports = router;
