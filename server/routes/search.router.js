const express = require('express');
const pool = require('../modules/pool');
require('dotenv').config();
const router = express.Router();
const axios = require('axios');

router.get('/:id',(req,res)=>{
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    console.log("req.params.id: ", req.params.id);
    axios({
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${req.params.id}`
    })
  
    .then ((response)=>{
      res.send(response.data);
    })
    .catch((error)=>{
      console.log("Error in get SEARCH", error);
    })
  
  })

  module.exports = router;
