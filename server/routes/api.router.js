const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

//Essie's old api route

// router.get('/', (req,res) => {
//     console.log('req.query.perPage: ', req.query.perPage)
//     console.log('req.query.perPage: ', req.query.pageNumber)
//     // axios get request to Refuge API to get bathrooms in Minneapolis? Do I even need this if I'm directly making the http get request from my saga?
//     axios({
//         method: "GET",
//         url: `https://refugerestrooms.org/api/v1/restrooms/by_location?lat=44.977753&lng=-93.2650108&search=Minneapolis%2C+Minnesota%2C&per_page=${req.query.perPage}&page=${req.query.pageNumber}`
//       })
//       .then ((response)=>{
//         res.send(response.data);
//       })
//       .catch((error)=>{
//         console.log("Error in get SEARCH", error);
//       })
// })


/**
 * GOOGLE Geocoding API
 */
router.get("/", (req, res) => {
  // query for which restrroms to get geocoding info for
  const query = /*sql*/`
  SELECT *
  FROM "restrooms"
  WHERE "restrooms".id = 2
  ORDER BY id;`
  pool.query(query)
    .then(async (dbRes) => {
      // db_bathrooms array of bathroom objects from db
      let db_bathrooms = dbRes.rows
      console.log('db bathrooms:', db_bathrooms);
      for (let i = 0; i < db_bathrooms.length; i++) {
        let restroom_id = db_bathrooms[i].id
        let apiGeocode = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCXfizt8q0KOhephD9TP55AqYdnUFNp1H0&address=${db_bathrooms[i].name.split(" ").join("%20")}%20${db_bathrooms[i].street.split(" ").join("%20")}%20${db_bathrooms[i].city.split(" ").join("%20")}%20${db_bathrooms[i].state.split(" ").join("%20")}`
        console.log('search string:', apiGeocode);
        await axios({
          method: "GET",
          url: `${apiGeocode}`
        })
          .then((response) => {
            // get good street address from geocoding api - double loop digging into "address_components"
            let formatted_address = response.data.results[0].formatted_address
            let street_number
            let street
            let city
            for (let i = 0; i<response.data.results[0].address_components.length; i++) {
              console.log('in loop at i', i);
              let type = response.data.results[0].address_components[i].types[0]
              console.log('type:', type);
              if (type = "street_number") {
                street_number = response.data.results[0].address_components[i].short_name
              } if (type = "route") {
                street = response.data.results[0].address_components[i].short_name
              } if (type = "locality") {
                city = response.data.results[0].address_components[i].short_name
              } 
              return (street_number, street, city)
            }
            console.log('street_number:', street_number, 'street:', street, 'city:', city, "formatted address:", formatted_address);
            // if (response.data.results[0].place_id) {
            //   const sqlQuery = `
            //   UPDATE "restrooms"
            //       SET "google_place_id"=$1
            //       WHERE "id"=$2
            //   `;
            //   const sqlValues = [response.data.results[0].place_id, restroom_id];
            //   pool.query(sqlQuery, sqlValues)
            // }
            // // not sure if we need this?
            // else { res.sendStatus(200) }
          })
          .catch((error) => {
            console.log("Error in geocode API", error);
          })
      }
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

/**
 * GOOGLE PLACES API
 */
router.get("/", (req, res) => {
  // query for which restrroms to get geocoding info for
  const query = /*sql*/`
  SELECT *
  FROM "restrooms"
  WHERE "restrooms".is_removed = FALSE AND "restrooms".id > 1 AND "restrooms".id < 5
  ORDER BY id;`
  pool.query(query)
    .then(async (dbRes) => {
      // db_bathrooms array of bathroom objects from db
      let db_bathrooms = dbRes.rows
      console.log('db bathrooms:', db_bathrooms);
      for (let i = 0; i < db_bathrooms.length; i++) {
        let restroom_id = db_bathrooms[i].id
        let places_id = db_bathrooms[i].google_place_id
        await axios({
          method: "GET",
          url: `https://places.googleapis.com/v1/places/${place_id}?fields=*&key=AIzaSyDwUFUMBNNbnaNJQjykE2YU6gnk-s5w5mo`
        })
          .then((response) => {
            console.log('place id:', response.data.results[0].place_id);
            if (response.data.results[0].place_id) {
              const sqlQuery = `
              UPDATE "restrooms"
                  SET "google_place_id"=$1
                  WHERE "id"=$2
              `;
              const sqlValues = [response.data.results[0].place_id, restroom_id];
              pool.query(sqlQuery, sqlValues)
            }
            // not sure if we need this?
            else { res.sendStatus(200) }
          })
          .catch((error) => {
            console.log("Error in geocode API", error);
          })
      }
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

//goop for places API
// .then((response) => {
//   let place_id = response.data.results[0].place_id
//   console.log('placeID from Geocoding:', response.data.results[0].place_id);
//   axios({
//     method: "GET",
//     url: `https://places.googleapis.com/v1/places/${place_id}?fields=*&key=AIzaSyDwUFUMBNNbnaNJQjykE2YU6gnk-s5w5mo`
//   })
//     .then((response) => {
//       console.log('info from place API:', response.data);
//     })
//     .catch((error) => {
//       console.log("Error in place API", error);
//     })
// })

// EXAMPLE GEOCODING API RESULT
// {
//   "results": [
//   {
//   "address_components": [
//   {
//   "long_name": "Municipal Building",
//   "short_name": "Municipal Building",
//   "types": [
//   "premise"
//   ]
//   },
//   {
//   "long_name": "350",
//   "short_name": "350",
//   "types": [
//   "street_number"
//   ]
//   },
//   {
//   "long_name": "South 5th Street",
//   "short_name": "S 5th St",
//   "types": [
//   "route"
//   ]
//   },
//   {
//   "long_name": "Central Minneapolis",
//   "short_name": "Central Minneapolis",
//   "types": [
//   "neighborhood",
//   "political"
//   ]
//   },
//   {
//   "long_name": "Minneapolis",
//   "short_name": "Minneapolis",
//   "types": [
//   "locality",
//   "political"
//   ]
//   },
//   {
//   "long_name": "Hennepin County",
//   "short_name": "Hennepin County",
//   "types": [
//   "administrative_area_level_2",
//   "political"
//   ]
//   },
//   {
//   "long_name": "Minnesota",
//   "short_name": "MN",
//   "types": [
//   "administrative_area_level_1",
//   "political"
//   ]
//   },
//   {
//   "long_name": "United States",
//   "short_name": "US",
//   "types": [
//   "country",
//   "political"
//   ]
//   },
//   {
//   "long_name": "55415",
//   "short_name": "55415",
//   "types": [
//   "postal_code"
//   ]
//   }
//   ],
//   "formatted_address": "Municipal Building, 350 S 5th St, Minneapolis, MN 55415, USA",
//   "geometry": {
//   "bounds": {
//   "northeast": {
//   "lat": 44.9778515,
//   "lng": -93.2646335
//   },
//   "southwest": {
//   "lat": 44.976716,
//   "lng": -93.26624269999999
//   }
//   },
//   "location": {
//   "lat": 44.9772839,
//   "lng": -93.2652365
//   },
//   "location_type": "ROOFTOP",
//   "viewport": {
//   "northeast": {
//   "lat": 44.97863273029149,
//   "lng": -93.2640891197085
//   },
//   "southwest": {
//   "lat": 44.9759347697085,
//   "lng": -93.26678708029151
//   }
//   }
//   },
//   "place_id": "ChIJiXW5Gpwys1IRtAwsAGrj2cU",
//   "types": [
//   "premise"
//   ]
//   }
//   ],
//   "status": "OK"
//   }

module.exports = router;