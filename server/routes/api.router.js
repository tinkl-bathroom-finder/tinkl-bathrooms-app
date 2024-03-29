const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    console.log('req.query.perPage: ', req.query.perPage)
    console.log('req.query.perPage: ', req.query.pageNumber)
    // axios get request to Refuge API to get bathrooms in Minneapolis? Do I even need this if I'm directly making the http get request from my saga?
    axios({
        method: "GET",
        url: `https://refugerestrooms.org/api/v1/restrooms/by_location?lat=44.977753&lng=-93.2650108&search=Minneapolis%2C+Minnesota%2C&per_page=${req.query.perPage}&page=${req.query.pageNumber}`
      })
      .then ((response)=>{
        res.send(response.data);
      })
      .catch((error)=>{
        console.log("Error in get SEARCH", error);
      })
})

module.exports = router;